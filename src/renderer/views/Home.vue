<template>
  <div>
    <h1 class="text-center font-bold text-2xl">
      سوره ها
    </h1>
    <div class="p-4">
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <li v-for="chapter in chapters" class="text-right">
          <router-link :to="`/chapter/${chapter.id}`">
            <ChapterItem :chapter="chapter" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../store/useStore'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import ChapterItem from '../components/ChapterItem.vue'

const store = useStore()
const { chapters } = storeToRefs(store)
</script>