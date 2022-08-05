<template>
  <div v-for="(word, i) in vocab" class="vocab flex gap-1 rounded-lg p-1">
    <div class="font-bold text-blue-800 dark:text-blue-200">
      {{ word.word }}:
    </div>
    <div class="dark:text-white">
      {{ word.meaning }}
    </div>
  </div>
</template>

<script setup>
// vue
import { ref, defineProps } from "vue";
defineProps({
  vocab: {
    type: Array,
    default: [],
  },
});
</script>
