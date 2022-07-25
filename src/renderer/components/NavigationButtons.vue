<template>
  <div class="flex justify-center gap-4">
    <router-link :to="`/read/${parseInt(index) - 1}`" v-if="index > 1">
      <div
        class="rounded-md border border-gray-500 border-opacity-20 px-4 py-2 hover:border-opacity-100 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:hover:border-gray-800 dark:hover:bg-gray-800"
      >
        <span>سوره قبلی</span>
      </div>
    </router-link>
    <router-link to="/">
      <div
        class="rounded-md border border-gray-500 border-opacity-20 px-4 py-2 hover:border-opacity-100 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:hover:border-gray-800 dark:hover:bg-gray-800"
      >
        <span>فهرست سوره ها</span>
      </div>
    </router-link>
    <router-link :to="`/read/${parseInt(index) + 1}`" v-if="index < 114">
      <div
        class="rounded-md border border-gray-500 border-opacity-20 px-4 py-2 hover:border-opacity-100 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:hover:border-gray-800 dark:hover:bg-gray-800"
      >
        <span>سوره بعدی</span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  index: {
    type: [Number, String],
    required: true,
  },
});
</script>
