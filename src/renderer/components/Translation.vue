<template>
  <div class="mb-8" :class="{ 'text-left': language === 'en' }" :dir="dir">
    <div class="mb-2 text-xl">{{ translation }}</div>
    <div class="text-xs text-gray-600 text-opacity-70">- {{ translator }}</div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  translation: {
    type: String,
    required: true,
  },
  translator: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

const dir = computed(() => {
  return props.language === "en" ? "ltr" : "rtl";
});
</script>
