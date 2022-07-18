<template>
  <div
    class="group mt-2 flex items-center justify-between rounded-md border border-gray-200 p-4 hover:border-teal-600"
  >
    <div class="flex justify-start gap-8">
      <div
        class="flex h-10 w-10 rotate-45 items-center justify-center bg-gray-100 group-hover:bg-teal-600 group-hover:text-white"
      >
        <div class="-rotate-45">{{ chapter.id }}</div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="self-center font-bold">{{ chapter.name }}</div>
        <div class="self-center text-xs text-gray-600">
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
          :src="`../assets/${chapter.revelation_place}.png`"
          alt="Revelation place image"
        />
      </div>
      <!-- verse count -->
      <div class="text-xs">{{ chapter.verses_count }} آیه</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  chapter: {
    type: Object,
    required: true,
  },
});
</script>
