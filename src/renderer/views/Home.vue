<template>
  <div>
    <div class="m-6">
      <div class="flex cursor-pointer justify-center">
        <div
          class="flex w-full max-w-2xl items-center justify-between rounded-full border-2 border-gray-300 py-3 px-6"
          @click="store.commandPalette = true"
        >
          <div class="flex justify-start gap-3 text-xl text-gray-600">
            <SearchIcon class="text-gray-400" />
            <div>جستجو...</div>
          </div>
          <div class="rounded-md bg-gray-200 py-1 px-2 font-english text-xs">
            ctrl K
          </div>
        </div>
      </div>
    </div>

    <h1 class="text-center text-2xl font-bold">سوره ها</h1>
    <div class="p-4">
      <ul
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <li v-for="chapter in chapters" class="text-right">
          <router-link :to="`read/${chapter.id}`">
            <ChapterItem :chapter="chapter" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../store/useStore";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import ChapterItem from "../components/ChapterItem.vue";
import SearchIcon from "../components/SearchIcon.vue";

const store = useStore();
const { chapters } = storeToRefs(store);
</script>
