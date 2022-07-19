<template>
  <div class="mb-4 flex justify-between gap-12">
    <!-- verse -->
    <div class="flex-1 gap-2">
      <div class="my-12 text-3xl leading-loose dark:text-white">
        <span class="font-arabic">
          {{ verse.text_original }}
        </span>
        <span> ({{ verse.verse_id }}) </span>
      </div>
      <!-- translations -->
      <Translation
        v-for="translation in translations"
        :translation="verse[translation.id]"
        :translator="translation.name"
        :language="translation.language"
      />

      <!-- topics -->
      <!-- <div class="flex gap-3">
        <span
          class="flex w-max cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-500"
        >
          توحید
        </span>
        <span
          class="flex w-max cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-500"
        >
          عصمت
        </span>
      </div> -->
    </div>

    <!-- <div class="mt-6 flex flex-col gap-3">
      <div class="flex gap-1">
        <div class="font-bold text-blue-800">بسم:</div>
        <div>به نام</div>
      </div>
      <div class="flex gap-1">
        <div class="font-bold text-blue-800">الرحمن:</div>
        <div>بخشنده</div>
      </div>
    </div> -->

    <!-- left side -->
    <div class="mt-8 flex flex-col gap-6">
      <!-- chapter:verse -->
      <div class="text-md text-gray-600 text-opacity-70 dark:text-gray-200">
        {{ verse.chapter_id }}:{{ verse.verse_id }}
      </div>
      <!-- copy icon -->
      <div>
        <CopyToClipboardIcon
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
        />
      </div>
      <!-- bookmark icon -->
      <div>
        <BookmarkIcon
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
        />
      </div>
      <!-- options icon -->
      <div>
        <OptionsIcon
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
        />
      </div>
    </div>
  </div>
  <!-- hr -->
  <div class="h-px w-full bg-gray-100"></div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";

import Translation from "../components/Translation.vue";
import CopyToClipboardIcon from "../components/CopyToClipboardIcon.vue";
import BookmarkIcon from "../components/BookmarkIcon.vue";
import OptionsIcon from "../components/OptionsIcon.vue";

defineProps({
  verse: {
    type: Object,
    required: true,
  },
});

const translations = [
  // { id: 'en_shakir', name: 'Shakir', language: 'en'},
  // { id: 'fa_ansarian', name: 'انصاریان', language: 'fa'},
  { id: "fa_bahrampour", name: "بهرامپور", language: "fa" },
  // { id: 'fa_makarem', name: 'مکارم', language: 'fa'},
  // { id: 'fa_qaraati', name: 'قرائتی', language: 'fa'},
];
</script>
