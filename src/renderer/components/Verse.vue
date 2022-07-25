<template>
  <div
    class="flex justify-between gap-12 rounded-lg p-4 pb-8"
    :class="`verse-${verse.verse_id}`"
  >
    <!-- verse -->
    <div class="flex-1 gap-2">
      <div class="my-12 text-3xl leading-loose dark:text-white">
        <span class="font-arabic" v-html="verse.text_original"></span>
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
      <!-- goTo icon -->
      <div v-if="icons.includes('goToVerse')" @click="goToVerse(verse)">
        <ArrowLeftIcon
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
        />
      </div>
      <!-- copy icon -->
      <div
        v-if="icons.includes('copyToClipboard')"
        @click="copyToClipboard(verse)"
      >
        <CopyToClipboardIcon
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
        />
      </div>
      <!-- bookmark icon -->
      <div v-if="icons.includes('bookmark')">
        <BookmarkIcon
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
        />
      </div>
      <!-- options icon -->
      <div v-if="icons.includes('options')">
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
import { useClipboard } from "@vueuse/core";

import { defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/useStore";

import { useNotification } from "../composables/notification";

import Translation from "../components/Translation.vue";
import CopyToClipboardIcon from "../components/icons/CopyToClipboardIcon.vue";
import BookmarkIcon from "../components/icons/BookmarkIcon.vue";
import OptionsIcon from "../components/icons/OptionsIcon.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";

defineProps({
  verse: {
    type: Object,
    required: true,
  },
  icons: {
    type: Array,
    default: ["copyToClipboard", "bookmark", "options"],
  },
});

const router = useRouter();
const store = useStore();

const translations = [
  // { id: 'en_shakir', name: 'Shakir', language: 'en'},
  // { id: 'fa_ansarian', name: 'انصاریان', language: 'fa'},
  { id: "fa_bahrampour", name: "بهرامپور", language: "fa" },
  // { id: 'fa_makarem', name: 'مکارم', language: 'fa'},
  // { id: 'fa_qaraati', name: 'قرائتی', language: 'fa'},
];

const goToVerse = ({ chapter_id, verse_id }) => {
  router.push(`/read/${chapter_id}`);
  store.scrollTo = {
    verse: verse_id,
  };
};

const copyToClipboard = ({
  text_original,
  chapter_name,
  chapter_id,
  verse_id,
}) => {
  const { text, copy, copied, isSupported } = useClipboard({
    source: `${text_original} (${chapter_name}:${verse_id})`,
  });
  copy();
  useNotification("در کلیپبورد کپی شد");
};
</script>
