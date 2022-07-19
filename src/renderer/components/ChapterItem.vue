<template>
  <div
    class="group mt-2 flex items-center justify-between rounded-md border border-gray-200 p-4 hover:border-teal-600"
  >
    <div class="flex justify-start gap-8">
      <div
        class="flex h-10 w-10 rotate-45 items-center justify-center bg-gray-100 group-hover:bg-teal-600 group-hover:text-white dark:bg-gray-700"
      >
        <div class="-rotate-45 dark:text-white">{{ chapter.id }}</div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="self-center font-bold dark:text-white">
          {{ chapter.name }}
        </div>
        <div class="self-center text-xs text-gray-600 dark:text-gray-200">
          {{ chapter.translation }}
        </div>
      </div>
    </div>

    <!-- left side  -->
    <div class="flex flex-col justify-between gap-3">
      <!-- revelation place image -->
      <div class="flex justify-center">
        <img
          class="w-4"
          :src="revelationPlace(chapter.revelation_place)"
          alt="Revelation place image"
        />
      </div>
      <!-- verse count -->
      <div class="text-xs dark:text-gray-200">
        {{ chapter.verses_count }} آیه
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

import MakkiImg from "../assets/Makki.png";
import MadaniImg from "../assets/Madani.png";

const revelationPlace = (place) => {
  return place === "makki" ? MakkiImg : MadaniImg;
};

defineProps({
  chapter: {
    type: Object,
    required: true,
  },
});
</script>
