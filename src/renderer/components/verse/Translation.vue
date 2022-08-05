<template>
  <div
    class="container mb-8 dark:text-white"
    :class="{ 'text-english text-left': translation.language === 'en' }"
    :dir="dir"
  >
    <div class="mb-2 min-w-0 text-xl dark:text-white">
      {{ text }}
    </div>
    <div class="text-xs text-gray-600 text-opacity-70 dark:text-gray-300">
      - {{ translation.translator }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  translation: {
    type: Object,
    required: true,
    default: {
      name: "",
      translator: "",
      language: "",
    },
  },
  text: {
    type: String,
    required: true,
    default: "",
  },
});

const dir = computed(() => {
  return props.translation.language === "en" ? "ltr" : "rtl";
});
</script>
