<template>
  <h1 class="text-center text-3xl dark:text-white">موضوعات</h1>

  <div class="mx-auto mt-8 w-full rounded-lg bg-white p-4 dark:bg-gray-800">
    <div v-for="topic in store.topics">
      <div
        class="my-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors dark:bg-gray-900"
      >
        <div class="p-2 text-2xl text-black dark:text-white">
          <span>{{ topic.topic_name }}</span>
          <span class="mr-2 text-sm text-gray-700 dark:text-gray-300">
            ({{ topic?.verses?.length }} آیات)
          </span>
        </div>
        <router-link :to="`/topics/${topic.topic_id}`">
          <ChevronUpIcon
            class="h-8 w-8 -rotate-90 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// components
import VerseList from "../components/verse/VerseList.vue";
import ChevronUpIcon from "../components/icons/ChevronUpIcon.vue";

import { useStore } from "../store/useStore";
const store = useStore();
</script>
