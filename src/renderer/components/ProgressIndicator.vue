<template>
  <div v-if="route.name === 'Read'" class="px-1">
    <div class="z-10 h-1 w-full rounded-lg bg-gray-300">
      <div
        class="h-1 rounded-lg bg-gray-600"
        :style="{ width: progress }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

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
