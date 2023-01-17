<template>
  <aside
    class="sticky top-0 flex h-screen w-12 flex-none flex-col items-center bg-gray-100 dark:bg-gray-800"
  >
    <!-- logo -->
    <div class="my-4">
      <img class="w-10 object-contain" :src="QuranLogo" alt="Quran Logo" />
    </div>
    <!-- hr -->
    <div class="h-px w-full bg-gray-200 dark:bg-gray-900"></div>
    <!-- icons -->
    <div class="mt-4 flex flex-col gap-4">
      <router-link
        to="/"
        class="rounded-md p-2 focus:outline-gray-300 focus:ring-0"
      >
        <HomeIcon class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400" />
      </router-link>
      <router-link
        :to="`/read/${store.chapterId}`"
        class="rounded-md p-2 focus:outline-gray-300 focus:ring-0"
      >
        <BookOpenIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link
        to="/search"
        class="rounded-md p-2 focus:outline-gray-300 focus:ring-0"
      >
        <MagnifyingGlassIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link
        to="/bookmarks"
        class="rounded-md p-2 focus:outline-gray-300 focus:ring-0"
      >
        <BookmarkIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link
        to="/topics"
        class="rounded-md p-2 focus:outline-gray-300 focus:ring-0"
      >
        <QueueListIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link
        to="/vocabulary"
        class="rounded-md p-2 focus:outline-gray-300 focus:ring-0"
      >
        <TableCellsIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link
        to="/test"
        class="rounded-md bg-red-300 p-2 focus:outline-gray-300 focus:ring-0"
      >
        <SparklesIcon />
      </router-link>
    </div>
  </aside>
</template>

<script setup>
// store
import { useStore } from "../store/store";

// components
import {
  HomeIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  QueueListIcon,
  TableCellsIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";

// images
import QuranLogo from "../assets/images/Quran.png";

//store
const store = useStore();
</script>
