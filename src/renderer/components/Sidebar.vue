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
        <HomeIcon />
      </router-link>
      <router-link :to="`/read/${store.chapterId}`" class="rounded-md p-2">
        <ReadIcon />
      </router-link>
      <router-link to="/search" class="rounded-md p-2">
        <SearchIcon />
      </router-link>
      <router-link to="/bookmarks" class="rounded-md p-2">
        <BookmarkIcon />
      </router-link>
      <router-link to="/topics" class="rounded-md p-2">
        <CollectionIcon />
      </router-link>
      <router-link to="/vocabulary" class="rounded-md p-2">
        <TableIcon />
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
