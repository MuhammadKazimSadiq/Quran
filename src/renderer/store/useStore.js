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

    // rows: Array
    // key: String
    // groupCols: Array [groupName: String, groupKey: String, groupCols: Array[[originalName, newName], [originalName, newName]] ]
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
      await this.replaceVerse(id);
    },

    async replaceVerse(id) {
      const verse = await Verse.get(id);
      const groupedVerse = this.groupRows({
        rows: verse,
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
          ["topic_id", topic.id],
        ]);
      }

      for (let topic of toAdd) {
        if (!topic.id) topic.id = await this.addTopic(topic.name);
        await VerseTopic.insert({ verse_id: verseId, topic_id: topic.id });
      }
    },
  },
});
