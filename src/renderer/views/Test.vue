<template>
  <div class="text-center font-english text-3xl font-bold dark:text-white">
    Test
  </div>

  <button @click="onExport">Export</button>

  <form @submit.prevent="onImport">
    <input
      class="flex-1 border-0 text-xl focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
      type="file"
    />
    <button type="submit">Import</button>
  </form>
</template>

<script setup>
import { ipcRenderer } from "../electron";

const onExport = () => {
  ipcRenderer.invoke("export").then((data) => {
    // console.log(data);
  });
};

const onImport = (e) => {
  const path = e.target[0].files[0].path;
  ipcRenderer.invoke("import", { path }).then((data) => {
    console.log(data);
  });
};
// import { ref, computed, onMounted } from "vue";

// import { useStore } from "../store/store";
// import VerseWord from "../model/VerseWord";
// const store = useStore();

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
