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

// const data = [
//   { id: 1, name: "Topic 1", parent_id: null, verses: 5 },
//   { id: 2, name: "Topic 2", parent_id: 1, verses: 2 },
//   { id: 3, name: "Topic 3", parent_id: 2, verses: 3 },
//   { id: 4, name: "Topic 4", parent_id: 2, verses: 0 },
//   { id: 5, name: "Topic 5", parent_id: 4, verses: 0 },
//   { id: 6, name: "Topic 6", parent_id: null, verses: 0 },
//   { id: 7, name: "Topic 7", parent_id: 1, verses: 2 },
//   { id: 8, name: "Topic 8", parent_id: 7, verses: 2 },
//   { id: 9, name: "Topic 9", parent_id: 5, verses: 3 },
//   { id: 10, name: "Topic 10", parent_id: 1, verses: 4 },
// ];

// const getVersesCount = (data, parent) => {
//   const children = data.filter((topic) => topic.parent_id === parent.id);
//   if (!children.length) {
//     return parent.verses;
//   }
//   return children.reduce((acc, child) => {
//     return acc + getVersesCount(data, child);
//   }, parent.verses);
// };

// const topics = data.map((topic) => {
//   return {
//     id: topic.id,
//     name: topic.name,
//     parent_id: topic.parent_id,
//     verses: topic.verses,
//     versesCount: getVersesCount(data, topic),
//   };
// });

// console.log(topics);
</script>
