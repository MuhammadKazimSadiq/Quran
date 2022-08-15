import { defineStore } from "pinia";

// models
import Chapter from "../model/Chapter";
import Verse from "../model/Verse";
import Bookmark from "../model/Bookmark";
import Vocabulary from "../model/Vocabulary";
import Translation from "../model/Translation";
import Setting from "../model/Setting";
import Topic from "../model/Topic";
import VerseTopic from "../model/VerseTopic";

// composables
import { useGroup } from "../composables/group";
import { useReplace } from "../composables/replace";

// config
import { versesConfig, topicsConfig } from "../config/groupConfig";

export const useStore = defineStore("mainStore", {
  state: () => ({
    // data
    chapters: [],
    verses: [],
    vocabulary: [],
    settings: [], // enabled_translations, theme
    translations: [],
    topics: [],

    // theme
    theme: "light",

    // searches
    searchResults: [],
    searchSelectedTab: 0,

    // bookmarkedVerses
    bookmarkedVerses: [],

    // current chapter_id --> read page - used in Read.vue and Sidebar.vue
    chapterId: 1,
    // current page_id --> read page
    pageId: 1,
    // current section_id --> read page
    sectionId: 1,

    // used for search
    scrollTo: {},

    // commandPalette
    commandPalette: false,

    // notification
    notification: {
      show: false,
      message: "",
    },
  }),

  getters: {
    getVerseById: (state) => (id) =>
      Array.isArray(id)
        ? state.verses.filter((verse) => id.includes(verse.id))
        : state.verses.find((verse) => verse.id === id),

    getVersesByChapter: (state) => (chapterId) =>
      state.verses.filter((verse) => verse.chapter_id == chapterId),

    getChapter: (state) => (id) =>
      state.chapters.find((chapter) => chapter.id == id),

    getTopic: (state) => (id) =>
      state.topics.find((topic) => topic.topic_id == id),

    getBookmarkedVerses: (state) =>
      state.verses.filter((verse) => verse.bookmarked),
  },

  actions: {
    search(query) {
      if (!query.length) return;
      return new Promise((resolve) => {
        // remove diacritics from query
        const queryString = query.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();

        const verses = this.verses.filter((verse) => {
          const regex = new RegExp(queryString, "g");
          return verse.text_clean.match(regex);
        });

        this.addToSearchResults({ query: queryString, verses });
        resolve();
      });
    },

    addToSearchResults({ query, verses }) {
      // pluck verse ids
      const verseIds = verses.reduce((acc, verse) => [...acc, verse.id], []);
      // add search query and verseIds in store.searchResults
      this.searchResults.push({ query, verses: verseIds });
    },

    async toggleBookmark({ id, bookmarked }) {
      if (bookmarked) await Bookmark.delete([["verse_id", id]]);
      else await Bookmark.insert({ verse_id: id });
      await useReplace("verse", id, { group: true, groupConfig: versesConfig });
    },

    changeTheme() {
      const newThemeValue = this.settings?.theme === "light" ? "dark" : "light";
      document.body.classList.remove(this.settings?.theme);
      document.body.classList.add(newThemeValue);
      this.settings.theme = newThemeValue;
      Setting.update([["name", "theme"]], [["value", `"${newThemeValue}"`]]);
    },

    updateTranslations() {
      Setting.update(
        [["name", "enabled_translations"]],
        [["value", JSON.stringify(this.settings?.enabled_translations)]]
      );
    },

    async addWordToVocab({ verse_id, word, meaning }) {
      await Vocabulary.insert({ verse_id, word, meaning });
      await useReplace("verse", verse_id, {
        group: true,
        groupConfig: versesConfig,
      });
    },

    async addTopic(name) {
      return new Promise(async (resolve, reject) => {
        try {
          const topic = await Topic.insert({ name });
          resolve(topic[0].id);
        } catch (err) {
          reject(`Err: ${err}`);
        }
      });
    },

    async updateVerseTopics({ verseId, oldTopics, newTopics }) {
      const { toAdd, toDelete } = Topic.sync(oldTopics, newTopics);

      for (let topic of toDelete) {
        await VerseTopic.delete([
          ["verse_id", verseId],
          ["topic_id", topic.topic_id],
        ]);

        await useReplace("topic", topic.topic_id, {
          group: true,
          groupConfig: topicsConfig,
          replaceWithIndex: true,
          indexColumn: "topic_id",
        });
      }

      for (let topic of toAdd) {
        if (!topic.topic_id)
          topic.topic_id = await this.addTopic(topic.topic_name);
        await VerseTopic.insert({
          verse_id: verseId,
          topic_id: topic.topic_id,
        });

        await useReplace("topic", topic.topic_id, {
          group: true,
          groupConfig: topicsConfig,
          replaceWithIndex: true,
          indexColumn: "topic_id",
        });
      }
    },

    async createTopic({ name, parent_id }) {
      let topic = await Topic.insert({ name, parent_id });

      topic = {
        topic_id: topic[0].id,
        topic_name: topic[0].name,
        parent_id: topic[0].parent_id,
        verses: [],
      };

      this.topics.push(topic);
    },

    async updateTopic({ id, name, parent_id }) {
      await Topic.update(
        [["id", id]],
        [
          ["name", name],
          ["parent_id", parent_id],
        ]
      );

      await useReplace("topic", id, {
        group: true,
        groupConfig: topicsConfig,
        replaceWithIndex: true,
        indexColumn: "topic_id",
      });
    },

    async deleteTopic(
      { topic_id: id, parent_id },
      children = [],
      deleteChildren = false
    ) {
      // if delete children --> get allChildren of topic and delete
      if (deleteChildren) {
        for (let child of children) {
          await Topic.delete([["id", child.topic_id]]);
        }
      }

      // else if has parent_id --> connect children to parent
      else if (parent_id) {
        let directChildren = children.filter((t) => t.parent_id === id);
        console.log(directChildren);

        for (let child of directChildren) {
          await Topic.update(
            [["id", child.topic_id]],
            [["parent_id", parent_id]]
          );
        }
      }

      // else remove parent_id from children
      else {
        let directChildren = children.filter((t) => t.parent_id === id);
        for (let child of directChildren) {
          await Topic.update([["id", child.topic_id]], [["parent_id", 0]]);
        }
      }

      await Topic.delete([["id", id]]);
      const index = this.topics.findIndex((topic) => topic.topic_id === id);
      this.topics.splice(index, 1);
    },

    async removeVerseTopic({ verse_id, topic_id }) {
      await VerseTopic.delete([
        ["verse_id", verse_id],
        ["topic_id", topic_id],
      ]);

      await useReplace("verse", verse_id, {
        group: true,
        groupConfig: versesConfig,
      });

      await useReplace("topic", topic_id, {
        group: true,
        groupConfig: topicsConfig,
        replaceWithIndex: true,
        indexColumn: "topic_id",
      });
    },

    async updateWordMeaning({ vocab_id: id, meaning }) {
      await Vocabulary.update([["id", id]], [["meaning", meaning]]);

      await useReplace("vocabulary", id, {
        storeName: "vocabulary",
        replaceWithIndex: true,
        indexColumn: "id",
      });
    },

    async deleteWordMeaning({ vocab_id: id }) {
      await Vocabulary.delete([["id", id]]);
      const index = this.vocabulary.findIndex((word) => word.vocab_id === id);
      this.vocabulary.splice(index, 1);
    },
  },
});
