<template>
  <div class="group p-4 mt-2 border border-gray-200 rounded-md flex justify-between items-center hover:border-teal-600">
    <div class="flex justify-start gap-8">
      <div
        class="w-10 h-10 bg-gray-100 flex justify-center items-center rotate-45 group-hover:bg-teal-600 group-hover:text-white">
        <div class="-rotate-45">{{ chapter.id }}</div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="font-bold self-center">{{ chapter.name }}</div>
        <div class="text-xs text-gray-600 self-center">{{ chapter.translation }}</div>
      </div>
    </div>
    <div class="text-xs">
      {{ chapter.verses_count }} آیه
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  chapter: {
    type: Object,
    required: true,
  },
})
</script>