<template>
  <div v-if="!lazyLoad || loaded">
    <TopicInput :verseId="verseId" :topics="topics" />
  </div>
  <div v-else class="py-4">
    <div class="h-2 w-3/4 rounded-md bg-gray-300 dark:bg-gray-700"></div>
  </div>
</template>

<script setup>
// components
import TopicInput from "./TopicInput.vue";

const props = defineProps({
  verseId: {
    type: Number,
    required: true,
    default: 0,
  },
  topics: {
    type: Array,
    default: [],
  },
  lazyLoad: {
    type: Boolean,
    default: false,
  },
  loaded: {
    type: Boolean,
    default: true,
  },
});
</script>
