<template>
  <div class="text-center font-english text-3xl font-bold">Test</div>

  <div v-for="verse in store.verses.slice(0, 2)">
    <TopicInput :verseId="verse.id" :topics="verse.topics" />
  </div>
</template>

<script setup>
import TopicInput from "../components/TopicInput.vue";

import { useStore } from "../store/useStore";
const store = useStore();
</script>
