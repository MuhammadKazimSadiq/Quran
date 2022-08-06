<template>
  <div v-for="word in vocab" class="vocab flex gap-2 rounded-lg p-1">
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
import { defineProps } from "vue";

// props
defineProps({
  vocab: {
    type: Array,
    default: [],
  },
});
</script>
