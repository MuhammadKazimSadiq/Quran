import { defineStore } from "pinia";
import Chapter from "../model/Chapter";
import Verse from "../model/Verse";
import Bookmark from "../model/Bookmark";
import Vocabulary from "../model/Vocabulary";
import Translation from "../model/Translation";
import Setting from "../model/Setting";

export const useStore = defineStore("main", {
  state: () => ({
    // data
    chapters: [],
    verses: [],
    vocabulary: [],
    settings: [], // enabled_translations, theme
    translations: [],

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
            this.verses = this.groupVerses(verses);
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

    groupVerses(verses) {
      return Object.values(
        verses.reduce((acc, verse) => {
          if (acc[verse.id]) {
            if (
              acc[verse.id].topics.length &&
              !acc[verse.id].topics.some(
                (topic) =>
                  topic.id === verse.topic_id && topic.name === verse.topic
              )
            )
              acc[verse.id].topics.push({
                id: verse.topic_id,
                name: verse.topic,
              });
            if (
              acc[verse.id].vocab.length &&
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
        const verses = this.verses.filter((verse) => {
          const regex = new RegExp(query, "g");
          return verse.text_clean.match(regex);
        });
        // pluck verse ids
        const verseIds = verses.reduce((acc, verse) => {
          acc.push(verse.id);
          return acc;
        }, []);
        // add search query and verseIds in store.searchResults
        this.searchResults.push({ query, verses: verseIds });
        resolve();
      });
    },

    async toggleBookmark({ id, bookmarked }) {
      if (bookmarked) await Bookmark.delete([["verse_id", id]]);
      else await Bookmark.INSERT({ verse_id: id });
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
  },
});
