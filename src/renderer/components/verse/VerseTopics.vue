<template>
  <div v-if="!lazyLoad || loaded">
    <TopicInput :verseId="verseId" :topics="topics" />
  </div>
  <div v-else>
    <div class="h-2 w-3/4 rounded-md bg-gray-300"></div>
  </div>
</template>

<script setup>
// vue
import { defineProps } from "vue";

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
    default: () => [],
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
