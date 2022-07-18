<template>
  <div class="mb-4 flex justify-between gap-12">
    <!-- verse -->
    <div class="gap-2 flex-1">
      <div class="text-3xl my-12 font-quran leading-loose">
        {{ verse.text_original }}
        <span>({{ verse.verse_id }})</span>
      </div>
      <Translation v-for="translation in translations" :translation="verse[translation.id]"
        :translator="translation.name" :language="translation.language" />
    </div>

    <!-- left side -->
    <div class="mt-8 flex flex-col gap-6">
      <!-- chapter:verse -->
      <div class="text-md text-gray-600 text-opacity-70">
        {{ verse.chapter_id }}:{{ verse.verse_id }}
      </div>
      <!-- copy icon -->
      <div>
        <svg class="w-5 text-gray-600 text-opacity-70 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
          </path>
        </svg>
      </div>
      <!-- bookmark icon -->
      <div>
        <svg class="w-5 text-gray-600 text-opacity-70 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
      </div>
      <!-- options icon -->
      <div>
        <svg class="w-5 text-gray-600 text-opacity-70 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
          </path>
        </svg>
      </div>
    </div>
  </div>
  <!-- hr -->
  <div class="h-px w-full bg-gray-100"></div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

import Translation from '../components/Translation.vue'

defineProps({
    verse: {
        type: Object,
        required: true
    }
})

const translations = [
  // { id: 'en_shakir', name: 'Shakir', language: 'en'},
  // { id: 'fa_ansarian', name: 'انصاریان', language: 'fa'},
  { id: 'fa_bahrampour', name: 'بهرامپور', language: 'fa'},
  // { id: 'fa_makarem', name: 'مکارم', language: 'fa'},
  // { id: 'fa_qaraati', name: 'قرائتی', language: 'fa'},
]
</script>