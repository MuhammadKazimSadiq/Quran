<template>

  <div class="font-display flex">
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
        <router-link to="/chapter" class="rounded-md p-2">
          <svg class="w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
            </path>
          </svg>
        </router-link>
        <router-link to="/search" class="rounded-md p-2">
            <svg class="w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </router-link>
      </div>
    </aside>

    <div class="flex-1">
      <nav class="p-4 bg-gray-100 top-0 sticky z-10">
        <div class="text-2xl">قرآن</div>
      </nav>
      <main class="p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from './store/useStore'
// import { useLink } from 'vue-router'

import HomeIcon from './components/HomeIcon.vue'

const store = useStore()
const { fetchChapters, fetchVerses } = store

// const route = useRoute()

onMounted(() => {
  fetchChapters()
  fetchVerses()
})
</script>
