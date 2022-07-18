<template>
  <div>
    <div class="text-3xl font-bold text-center">
      سوره {{ getChapter(params.id).name }}
    </div>

    <div class="p-12">
      <ul>
        <li v-for="verse in getVersesByChapter(params.id)">
          <Verse :verse="verse" />
        </li>
      </ul>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-center gap-4">
      <router-link :to="`/read/${parseInt(params.id) - 1}`" v-if="params.id > 1">
        <div class="px-4 py-2 border border-gray-500 border-opacity-20 rounded-md hover:border-opacity-100">
          <span>سوره قبلی</span>
        </div>
      </router-link>
      <router-link to="/">
        <div class="px-4 py-2 border border-gray-500 border-opacity-20 rounded-md hover:border-opacity-100">
          <span>فهرست سوره ها</span>
        </div>
      </router-link>
      <router-link :to="`/read/${parseInt(params.id) + 1}`" v-if="params.id < 114">
        <div class="px-4 py-2 border border-gray-500 border-opacity-20 rounded-md hover:border-opacity-100">
          <span>سوره بعدی</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useStore } from '../store/useStore'

import Verse from '../components/Verse.vue'

const route = useRoute()
const { params } = storeToRefs(route)

const store = useStore()
const { getVersesByChapter, getChapter } = store

// change chapterId in store on mount
onMounted(() => {
  store.chapterId = route.params.id
})

// change chapterId in store when navigating to next/ previous chapter
onBeforeRouteUpdate((to, from) => {
  store.chapterId = to.params.id
}) 
</script>