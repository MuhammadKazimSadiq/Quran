import { defineStore } from 'pinia'
import Chapter from '../model/Chapter'
import Verse from '../model/Verse'

export const useStore = defineStore("main", {
  state: () => ({
    chapters: [],
    verses: [],
   }),

   getters: {
      getVersesByChapter: (state) => (chapterId) => state.verses.filter(verse => verse.chapter_id == chapterId),

      getChapter: (state) => (id) => state.chapters.find(chapter => chapter.id == id),
   },

   actions: {
      fetchChapters() {
            Chapter.all()
            .then(chapters => this.chapters = chapters)
      },

      fetchVerses() {
         Verse.all()
            .then(verses => this.verses = verses)
      }
   }
})