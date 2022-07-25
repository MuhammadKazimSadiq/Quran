import { defineStore } from "pinia";
import Chapter from "../model/Chapter";
import Verse from "../model/Verse";

export const useStore = defineStore("main", {
  state: () => ({
    // theme
    theme: "light",

    chapters: [],
    verses: [],

    // searches
    searchResults: [],

    // current chapter_id --> read page
    chapterId: 1,

    commandPalette: false,
    // used for search
    scrollTo: {},

    // notification
    notification: {
      show: false,
      message: "",
    },
  }),

  getters: {
    getVersesByChapter: (state) => (chapterId) =>
      state.verses.filter((verse) => verse.chapter_id == chapterId),

    getChapter: (state) => (id) =>
      state.chapters.find((chapter) => chapter.id == id),
  },

  actions: {
    fetchChapters() {
      Chapter.all().then((chapters) => (this.chapters = chapters));
    },

    fetchVerses() {
      Verse.all().then((verses) => (this.verses = verses));
    },

    search(query) {
      if (!query.length) return;
      return new Promise((resolve) => {
        Verse.find([], [["text_clean", "LIKE", query]]).then((verses) => {
          verses?.forEach((verse) => {
            // adding arabic diacritics inside [] --> optional search after each letter
            const pattern = query
              .split("")
              .reduce(
                (acc, char) =>
                  (acc += !char.match(/\s/g) ? `${char}[ًٌٍَُِّْ]*` : " "),
                ""
              );
            const regex = new RegExp(pattern, "g");
            const matches = verse.text_original.match(regex);
            matches?.forEach((match) => {
              verse.text_original = verse.text_original.replace(
                match,
                `<span class="bg-yellow-200 dark:bg-yellow-800 rounded-lg">${match}</span>`
              );
            });
          });

          this.searchResults.push({ query, verses });
          resolve();
        });
      });
    },

    changeTheme() {
      const newThemeValue = this.theme === "light" ? "dark" : "light";
      document.getElementById("root").classList.remove(this.theme);
      document.getElementById("root").classList.add(newThemeValue);
      this.theme = newThemeValue;
    },
  },
});
