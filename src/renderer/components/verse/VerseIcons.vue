<template>
  <!-- goTo icon -->
  <div v-if="icons.includes('goToVerse')" @click="goToVerse(verse)">
    <ArrowLeftIcon
      class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    />
  </div>
  <!-- goTo icon end -->

  <!-- copy icon -->
  <div v-if="icons.includes('copyToClipboard')" @click="copyToClipboard(verse)">
    <CopyToClipboardIcon
      class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    />
  </div>
  <!-- copy icon end -->

  <!-- bookmark icon -->
  <div v-if="icons.includes('bookmark')">
    <BookmarkIcon
      v-if="!verse.bookmarked"
      class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      @click="store.toggleBookmark(verse)"
    />
    <BookmarkFillIcon
      v-if="verse.bookmarked"
      class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      @click="store.toggleBookmark(verse)"
    />
  </div>
  <!-- bookmark icon end -->

  <!-- options icon -->
  <!-- <div v-if="icons.includes('options')">
    <OptionsIcon
      class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
    />
  </div> -->
  <!-- options icon end -->
</template>

<script setup>
// vue
import { defineProps } from "vue";

// router
import { useRouter } from "vue-router";

// store
import { useStore } from "../../store/useStore";

// components
import CopyToClipboardIcon from "../icons/CopyToClipboardIcon.vue";
import BookmarkIcon from "../icons/BookmarkIcon.vue";
import BookmarkFillIcon from "../icons/BookmarkFillIcon.vue";
import OptionsIcon from "../icons/OptionsIcon.vue";
import ArrowLeftIcon from "../icons/ArrowLeftIcon.vue";

// composables
import { useClipboard } from "@vueuse/core";
import { useNotification } from "../../composables/notification";

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
});

// router
const router = useRouter();

// store
const store = useStore();

// go to verse
const goToVerse = ({ id, chapter_id }) => {
  router.push(`/read/${chapter_id}`);
  store.$patch({
    scrollTo: {
      verse: id,
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