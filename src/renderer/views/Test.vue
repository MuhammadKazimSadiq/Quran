<template>
  <div class="text-center font-english text-3xl font-bold">Test</div>

  <input type="text" v-model="input" />
  <div class="font-english text-xl text-black">{{ output }}</div>
</template>

<script setup>
import { ref, computed } from "vue";
import TopicInput from "../components/TopicInput.vue";

import { useStore } from "../store/useStore";
const store = useStore();

const input = ref("");

const output = computed(() => {
  let chapter = "بقره";
  // let chapter = 2;
  let verse = 286;

  let regex = new RegExp(`^(سوره )?${chapter}(\\s+)?:(\\s+)?${verse}$`);
  // let regex = new RegExp(`${chapter}(\\s+)?:(\\s+)?${verse}$`);
  return input.value.trim().match(regex) ? "yes!" : "no!";
});
</script>
