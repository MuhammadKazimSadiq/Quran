<template>
  <div class="text-center font-english text-3xl font-bold dark:text-white">
    Test
  </div>

  <div class="mt-12 flex justify-center"></div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { useStore } from "../store/store";
const store = useStore();

import VerseWord from "../model/VerseWord";

const fetchWords = async ({ chapter_id, verse_id } = {}) => {
  const url = `https://api.qurancdn.com/api/qdc/verses/by_key/${chapter_id}:${verse_id}?words=true&word_translation_language=fa&word_fields=verse_key%2Cverse_id%2Cpage_number%2Clocation`;
  const response = await fetch(url);
  const result = await response.json();
  return result.verse;
};

// onMounted(() => {
//   setTimeout(async () => {
//     const verses = store.verses.slice(6230, 6236);

//     for (let v of verses) {
//       const verse_id = v.id;
//       const verse = await fetchWords(store.verses[verse_id - 1]);

//       for (let w of verse.words) {
//         const word = {
//           id: w.id,
//           text: w.text,
//           fa: w.translation.text,
//           // en: w.en,
//           position: w.position,
//           line_number: w.line_number,
//           page_number: w.page_number,
//           location: w.location,
//           char_type_name: w.char_type_name,
//           verse_id,
//         };
//         await VerseWord.insert(word);
//       }
//       console.log(verse_id);
//     }
//   }, 1000);
// });
</script>
