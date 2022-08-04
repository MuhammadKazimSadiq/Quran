<template>
  <div v-for="word in vocab" class="flex gap-1">
    <div class="font-bold text-blue-800 dark:text-blue-200">
      {{ word.word }}:
    </div>
    <div class="dark:text-white">{{ word.meaning }}</div>
  </div>
</template>

<script setup>
// vue
import { defineProps } from "vue";
defineProps({
  vocab: {
    type: Array,
    default: () => [],
  },
});
</script>
