<template>
  <div>
    <TopicInput :verseId="verseId" :topics="topics" />
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
});
</script>
