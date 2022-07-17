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

    <!-- icons -->
    <div class="mt-8 text-gray-600 text-opacity-70">
      <div class="text-md">
        {{ verse.chapter_id }}:{{ verse.verse_id }}
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