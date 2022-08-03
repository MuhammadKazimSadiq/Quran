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
      <router-link to="/" class="rounded-md p-2">
        <HomeIcon class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400" />
      </router-link>
      <router-link :to="`/read/${store.chapterId}`" class="rounded-md p-2">
        <ReadIcon class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400" />
      </router-link>
      <router-link to="/search" class="rounded-md p-2">
        <SearchIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link to="/bookmarks" class="rounded-md p-2">
        <BookmarkIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link to="/topics" class="rounded-md p-2">
        <CollectionIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link to="/vocabulary" class="rounded-md p-2">
        <TableIcon
          class="h-5 w-6 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </router-link>
      <router-link to="/test" class="rounded-md bg-red-300 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
// store
import { useStore } from "../store/useStore";

// components
import HomeIcon from "../components/icons/HomeIcon.vue";
import ReadIcon from "../components/icons/ReadIcon.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import BookmarkIcon from "../components/icons/BookmarkIcon.vue";
import CollectionIcon from "../components/icons/CollectionIcon.vue";
import TableIcon from "../components/icons/TableIcon.vue";

// images
import QuranLogo from "../assets/Quran.png";

//store
const store = useStore();
</script>
