<template>
  <aside class="h-screen sticky top-0 w-12 flex-none bg-gray-100 flex flex-col items-center">
    <!-- logo -->
    <div class="my-4">
      <img class="object-contain w-10" src=" ./assets/quran.png" alt="Quran Logo">
    </div>
    <!-- hr -->
    <div class="h-px w-full bg-gray-200"></div>
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
    </div>
  </aside>
</template>

<script setup>
import { useStore } from '../store/useStore'

import HomeIcon from '../components/HomeIcon.vue'
import ReadIcon from '../components/ReadIcon.vue'
import SearchIcon from '../components/SearchIcon.vue'
import BookmarkIcon from '../components/BookmarkIcon.vue'

const store = useStore()
</script>