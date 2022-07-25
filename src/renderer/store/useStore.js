import { defineStore } from "pinia";
import Chapter from "../model/Chapter";
import Verse from "../model/Verse";

export const useStore = defineStore("main", {
  state: () => ({
    theme: "light",

    chapters: [],
    verses: [],

    chapterId: 1,

    scrollTo: {},

    commandPalette: false,
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

    changeTheme() {
      const newThemeValue = this.theme === "light" ? "dark" : "light";
      document.getElementById("root").classList.remove(this.theme);
      document.getElementById("root").classList.add(newThemeValue);
      this.theme = newThemeValue;
    },
  },
});
