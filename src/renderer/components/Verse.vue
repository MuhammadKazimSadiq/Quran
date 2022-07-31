<template>
  <div
    class="flex justify-between gap-12 rounded-lg p-4 pb-8"
    :class="`verse verse-${verse.verse_id}`"
    :data-page-id="`${verse.page_id}`"
    :data-section-id="`${verse.section_id}`"
  >
    <!-- verse -->
    <div class="flex-1 gap-2">
      <div
        class="my-12 flex items-center text-3xl leading-loose dark:text-white"
      >
        <span class="font-arabic" v-html="parseVerse(verse)"></span>
      </div>

      <!-- translations -->
      <Translation
        v-for="translation in store.translations"
        :text="verse[translation.name]"
        :translation="translation"
      />
      <!-- translations end -->

      <!-- topics -->
      <div class="flex gap-3">
        <span
          v-for="topic in verse.topics"
          class="flex w-max cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 dark:text-white"
        >
          {{ topic.name }}
        </span>
      </div>
      <!-- topics end -->
    </div>
    <!-- verse end -->

    <!-- vocab -->
    <div class="mt-6 flex flex-col gap-3">
      <div v-for="word in verse.vocab" class="flex gap-1">
        <div class="font-bold text-blue-800 dark:text-blue-200">
          {{ word.word }}:
        </div>
        <div class="dark:text-white">{{ word.meaning }}</div>
      </div>
    </div>
    <!-- vocab end -->

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
      <!-- goTo icon end -->

      <!-- copy icon -->
      <div
        v-if="icons.includes('copyToClipboard')"
        @click="copyToClipboard(verse)"
      >
        <CopyToClipboardIcon
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
        />
      </div>
      <!-- copy icon end -->

      <!-- bookmark icon -->
      <div v-if="icons.includes('bookmark')">
        <BookmarkIcon
          v-if="!verse.bookmarked"
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
          @click="store.toggleBookmark(verse)"
        />
        <BookmarkFillIcon
          v-if="verse.bookmarked"
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
          @click="store.toggleBookmark(verse)"
        />
      </div>
      <!-- bookmark icon end -->

      <!-- options icon -->
      <div v-if="icons.includes('options')">
        <OptionsIcon
          class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
        />
      </div>
      <!-- options icon end -->
    </div>
    <!-- left side end -->
  </div>
  <!-- hr -->
  <div class="h-px w-full bg-gray-100"></div>
</template>

<script setup>
// vue
import { defineProps } from "vue";
// router
import { useRouter } from "vue-router";
// store
import { useStore } from "../store/useStore";

// composables
import { useClipboard } from "@vueuse/core";
import { useNotification } from "../composables/notification";
import { useHighlight } from "../composables/highlight";

// components
import Translation from "../components/Translation.vue";
import CopyToClipboardIcon from "../components/icons/CopyToClipboardIcon.vue";
import BookmarkIcon from "../components/icons/BookmarkIcon.vue";
import BookmarkFillIcon from "../components/icons/BookmarkFillIcon.vue";
import OptionsIcon from "../components/icons/OptionsIcon.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";

// props
const props = defineProps({
  verse: {
    type: Object,
    required: true,
  },
  icons: {
    type: Array,
    default: ["copyToClipboard", "bookmark"], // options
  },
  highlightText: {
    type: String,
    required: false,
  },
});

// router
const router = useRouter();
// store
const store = useStore();

const parseVerse = (verse) => {
  const highlighted = useHighlight({
    text: verse.text_original,
    search: props.highlightText,
    highlightClasses: "bg-yellow-200 dark:bg-yellow-800 rounded-lg",
  });
  return `
    ${highlighted} ${parseVerseNumber(verse.verse_id)}
  `;
};

const parseVerseNumber = (number) => {
  return `
    <span
      class="verse-number font-farsi inline-flex h-12 w-12 items-center justify-center text-sm text-green-800/70 dark:text-green-200/70 font-bold"
    >
      ${number}
    </span>
  `;
};

// go to verse
const goToVerse = ({ chapter_id, verse_id }) => {
  router.push(`/read/${chapter_id}`);
  store.$patch({
    scrollTo: {
      verse: verse_id,
    },
  });
};

// copy to clipboard
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
