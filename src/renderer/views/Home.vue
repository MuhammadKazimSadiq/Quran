<template>
  <div>
    <!-- search bar -->
    <div class="m-6">
      <div class="flex cursor-pointer justify-center">
        <div
          class="flex w-full max-w-2xl items-center justify-between rounded-full border-2 border-gray-300 py-3 px-6 dark:border-gray-700"
          @click="store.commandPalette = true"
        >
          <div class="flex justify-start gap-3 text-xl text-gray-600">
            <MagnifyingGlassIcon class="w-6 text-gray-400 dark:text-gray-100" />
            <div class="dark:text-gray-100">جستجو...</div>
          </div>
          <div class="rounded-md bg-gray-200 py-1 px-2 font-english text-xs">
            <kbd>ctrl K</kbd>
          </div>
        </div>
      </div>
    </div>
    <!-- search bar end -->

    <!-- chapters list -->
    <h1 class="text-center text-2xl font-bold dark:text-white">سوره ها</h1>
    <div class="p-4">
      <ul
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <li v-for="chapter in store.chapters" class="text-right">
          <router-link :to="`read/${chapter.id}`">
            <ChapterItem :chapter="chapter" />
          </router-link>
        </li>
      </ul>
    </div>
    <!-- chapters list end -->
  </div>
</template>

<script setup>
// store
import { useStore } from "../store/store";

// components
import ChapterItem from "../components/ChapterItem.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

// store
const store = useStore();
</script>
