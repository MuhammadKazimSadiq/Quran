<template>
  <div class="font-display flex box-border">
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
      </div>
    </aside>

    <div class="flex-1">
      <nav class="bg-gray-100 top-0 sticky z-10 flex flex-col">
        <div class="p-4 flex justify-between items-center">
          <div class="text-2xl">قرآن</div>
          <!-- icons -->
          <div class="flex justify-center gap-6">
            <!-- light/ dark mode toggle icon -->
            <div class="cursor-pointer">
              <svg class="w-6 text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </div>
            <!-- settings icon -->
            <div class="cursor-pointer">
              <svg class="w-6 text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                </path>
              </svg>
            </div>
          </div>
        </div>

        <div v-if="route.name === 'Read'" class="px-1">
          <ProgressIndicator />
        </div>
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
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import HomeIcon from './components/HomeIcon.vue'
import ReadIcon from './components/ReadIcon.vue'
import SearchIcon from './components/SearchIcon.vue'
import ProgressIndicator from './components/ProgressIndicator.vue'

const store = useStore()
const { fetchChapters, fetchVerses } = store

const route = useRoute()

onMounted(() => {
  fetchChapters()
  fetchVerses()
})
</script>

<style>
    *::-webkit-scrollbar {
      direction: rtl;
      width: 8px;
      height: 5px;
      background: rgb(224, 224, 224);
    }
  
    *::-webkit-scrollbar-thumb:hover {
      background-color: rgb(116, 116, 116);
    }
  
    *::-webkit-scrollbar-thumb {
      background-color: #adadad;
    }
</style>
