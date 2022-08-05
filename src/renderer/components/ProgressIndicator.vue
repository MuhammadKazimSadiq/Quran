<template>
  <div class="z-10 h-1 w-full rounded-lg bg-gray-300 dark:bg-gray-600">
    <div
      class="h-1 rounded-lg bg-gray-600 dark:bg-gray-300"
      :style="{ width: progress }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  window.addEventListener("scroll", updateProgressIndicator);
});

const progress = ref("0%");

const updateProgressIndicator = (e) => {
  const { documentElement, body } = document;
  let windowScroll = body.scrollTop || documentElement.scrollTop;
  let height = documentElement.scrollHeight - documentElement.clientHeight;
  progress.value = (windowScroll / height) * 100 + "%";
};
</script>
