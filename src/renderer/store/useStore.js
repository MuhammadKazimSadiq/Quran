import { defineStore } from "pinia";
import Chapter from "../model/Chapter";
import Verse from "../model/Verse";
import Bookmark from "../model/Bookmark";
import Vocabulary from "../model/Vocabulary";
import Translation from "../model/Translation";
import Setting from "../model/Setting";
import Topic from "../model/Topic";
import VerseTopic from "../model/VerseTopic";

export const useStore = defineStore("main", {
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
      state.verses.find((verse) => verse.id === id),

    getVersesByChapter: (state) => (chapterId) =>
      state.verses.filter((verse) => verse.chapter_id == chapterId),

    getChapter: (state) => (id) =>
      state.chapters.find((chapter) => chapter.id == id),

    getBookmarkedVerses: (state) =>
      state.verses.filter((verse) => verse.bookmarked),
  },

  actions: {
    async fetchSettings() {
      return new Promise((resolve, reject) => {
        if (this.settings.length) return resolve();
        Setting.all()
          .then((settings) => {
            this.settings = settings.reduce((acc, setting) => {
              acc[setting.name] = JSON.parse(setting.value);
              return acc;
            }, {});
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    async fetchTranslations() {
      return new Promise((resolve, reject) => {
        if (this.translations.length) return resolve();
        Translation.all()
          .then((translations) => {
            this.translations = translations;
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    async fetchChapters() {
      return new Promise((resolve, reject) => {
        if (this.chapters.length) return resolve();
        Chapter.all()
          .then((chapters) => {
            this.chapters = chapters;
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    async fetchVerses() {
      return new Promise((resolve, reject) => {
        if (this.verses.length) return resolve();
        Verse.all()
          .then((verses) => {
            // group verses
            this.verses = this.groupRows({
              rows: verses,
              key: "id",
              groupCols: [
                {
                  groupName: "topics",
                  groupKey: "topic_id",
                  cols: [
                    ["topic_id", "id"],
                    ["topic", "name"],
                  ],
                },
                {
                  groupName: "vocab",
                  groupKey: "word",
                  cols: [
                    ["word", "word"],
                    ["meaning", "meaning"],
                  ],
                },
              ],
            });
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    async fetchVocabulary() {
      return new Promise((resolve, reject) => {
        if (this.vocabulary.length) return resolve();
        Vocabulary.all()
          .then((vocabulary) => {
            this.vocabulary = vocabulary;
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    async fetchTopics() {
      return new Promise((resolve, reject) => {
        if (this.topics.length) return resolve();
        Topic.all()
          .then((topics) => {
            this.topics = this.groupTopics(topics);
            this.topics = this.groupRows({
              rows: topics,
              key: "topic_id",
              groupCols: [
                {
                  groupName: "verses",
                  groupKey: "id",
                  cols: [
                    ["id", "id"],
                    ["verse_id", "verse_id"],
                    ["chapter_id", "chapter_id"],
                    ["chapter_name", "chapter_name"],
                    ["text_clean", "text_clean"],
                    ["text_original", "text_original"],
                  ],
                },
              ],
            });
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    groupRows({ rows, key, groupCols = [] }) {
      return Object.values(
        rows.reduce((acc, row) => {
          if (acc[row[key]]) {
            groupCols.forEach(({ groupName, groupKey, cols }) => {
              const newGroupKeyName = cols.filter(
                (col) => col[0] === groupKey
              )[0][1];
              if (
                acc[row[key]][groupName].length &&
                !acc[row[key]][groupName].some(
                  (_row) => _row[newGroupKeyName] === row[groupKey]
                )
              ) {
                acc[row[key]][groupName].push(
                  cols.reduce(
                    (_acc, [originalName, newName]) => ({
                      ..._acc,
                      [newName]: row[originalName],
                    }),
                    {}
                  )
                );
              }
            });
          } else {
            acc[row[key]] = { ...row };
            groupCols.forEach(({ groupName, groupKey, cols }) => {
              acc[row[key]][groupName] = [];

              if (!row[groupKey]) return;
              acc[row[key]][groupName].push(
                cols.reduce(
                  (_acc, [originalName, newName]) => ({
                    ..._acc,
                    [newName]: row[originalName],
                  }),
                  {}
                )
              );
            });
          }
          return acc;
        }, {})
      );
    },

    groupTopics(topics) {
      return Object.values(
        topics.reduce((acc, topic) => {
          if (acc[topic.topic_id] && topic.id) {
            // add verse to topic.verses
            acc[topic.topic_id].verses.push({
              id: topic.id,
              verse_id: topic.verse_id,
              chapter_id: topic.chapter_id,
              chapter_name: topic.chapter_name,
              text_clean: topic.text_clean,
              text_original: topic.text_original,
            });
          } else {
            acc[topic.topic_id] = {
              ...topic,
              verses: [],
            };
            if (topic.id)
              acc[topic.topic_id].verses.push({
                id: topic.id,
                verse_id: topic.verse_id,
                chapter_id: topic.chapter_id,
                chapter_name: topic.chapter_name,
                text_clean: topic.text_clean,
                text_original: topic.text_original,
              });
          }
          return acc;
        }, {})
      );
    },

    groupVerses(verses) {
      // get all values from object: {0: {}, 1: {}, 2: {},...}
      return Object.values(
        verses.reduce((acc, verse) => {
          // if verse.id exists in acc.keys
          if (acc[verse.id]) {
            if (
              acc[verse.id].topics.length &&
              // not same topic
              !acc[verse.id].topics.some(
                (topic) =>
                  topic.id === verse.topic_id && topic.name === verse.topic
              )
            )
              // add topic to verse.topics
              acc[verse.id].topics.push({
                id: verse.topic_id,
                name: verse.topic,
              });
            if (
              acc[verse.id].vocab.length &&
              // not same vocab
              !acc[verse.id].vocab.some(
                (word) =>
                  word.word === verse.word && word.meaning === verse.meaning
              )
            )
              acc[verse.id].vocab.push({
                word: verse.word,
                meaning: verse.meaning,
              });
          } else {
            acc[verse.id] = {
              ...verse,
              topics: [],
              vocab: [],
            };
            if (verse.topic && verse.topic_id)
              acc[verse.id].topics.push({
                id: verse.topic_id,
                name: verse.topic,
              });
            if (verse.word && verse.meaning)
              acc[verse.id].vocab.push({
                word: verse.word,
                meaning: verse.meaning,
              });
          }
          return acc;
        }, {})
      );
    },

    search(query) {
      if (!query.length) return;
      return new Promise((resolve) => {
        // remove diacritics from query
        const queryString = query.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();

        const verses = this.verses.filter((verse) => {
          const regex = new RegExp(queryString, "g");
          return verse.text_clean.match(regex);
        });
        // pluck verse ids
        const verseIds = verses.reduce((acc, verse) => {
          acc.push(verse.id);
          return acc;
        }, []);
        // add search query and verseIds in store.searchResults
        this.searchResults.push({ query: queryString, verses: verseIds });
        resolve();
      });
    },

    async toggleBookmark({ id, bookmarked }) {
      if (bookmarked) await Bookmark.delete([["verse_id", id]]);
      else await Bookmark.insert({ verse_id: id });
      await this.replaceVerse(id);
    },

    async replaceVerse(id) {
      const verse = await Verse.get(id);
      const groupedVerse = this.groupVerses(verse);
      this.verses.splice(id - 1, 1, groupedVerse[0]);
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
      await this.replaceVerse(verse_id);
    },

    async addTopic(name) {
      try {
        const topic = await Topic.insert({ name });
        return topic[0].id;
      } catch (err) {
        console.log(`Err: ${err}`);
      }
    },

    async updateVerseTopics({ verseId, oldTopics, newTopics }) {
      const { toAdd, toDelete } = Topic.sync(oldTopics, newTopics);

      toDelete.forEach(async (topic) => {
        await VerseTopic.delete([
          ["verse_id", verseId],
          ["topic_id", topic.id],
        ]);
      });

      toAdd.forEach(async (topic) => {
        if (!topic.id) topic.id = await this.addTopic(topic.name);
        await VerseTopic.insert({ verse_id: verseId, topic_id: topic.id });
      });
    },
  },
});
