<template>
  <div class="text-center font-english text-3xl font-bold dark:text-white">
    Test
  </div>

  <div class="mt-12"></div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { useStore } from "../store/store";
const store = useStore();

import VerseWord from "../model/VerseWord";

// const fetchWords = async ({ chapter_id, verse_id } = {}) => {
//   const url = `https://api.qurancdn.com/api/qdc/verses/by_key/${chapter_id}:${verse_id}?words=true&word_translation_language=en&word_fields=verse_key%2Cverse_id%2Cpage_number%2Clocation%2Ccode_v1`;
//   const response = await fetch(url);
//   const result = await response.json();
//   return result.verse;
// };

// onMounted(() => {
// setTimeout(async () => {
// const verses = store.verses.slice(6000, 6250);

// for (let v of verses) {
// const verse_id = v.id;
// const verse = await fetchWords(store.verses[verse_id - 1]);

// for (let w of verse.words) {
// const word = {
// id: w.id,
// verse_id,
// text: w.text,
// fa: w.translation.text,
// en: w.translation.text,
// position: w.position,
// line_number: w.line_number,
// page_number: w.page_number,
// location: w.location,
// char_type_name: w.char_type_name,
// code: w.code_v1,
// };
// console.log(word);
// await VerseWord.insert(word);

// console.log(w.translation.text);

// await VerseWord.update(
//   [["id", w.id]],
//   [
//     ["en", w.translation.text.replaceAll("'", "")],
//     ["code", w.code_v1],
//   ]
// );
// }
// console.log(verse_id);
// }
// }, 1000);
// });
</script>
