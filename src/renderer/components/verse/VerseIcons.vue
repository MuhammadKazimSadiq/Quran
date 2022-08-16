<template>
  <!-- play icon -->
  <div v-if="icons.includes('play')" @click="null">
    <PlayIcon
      class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    />
  </div>
  <!-- goTo icon -->
  <div v-if="icons.includes('goToVerse')" @click="goToVerse(verse)">
    <ArrowNarrowLeftIcon
      class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    />
  </div>
  <!-- goTo icon end -->

  <!-- copy icon -->
  <div v-if="icons.includes('copyToClipboard')" @click="copyToClipboard(verse)">
    <DuplicateIcon
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

  <!-- remove topic icon -->
  <div v-if="icons.includes('removeTopic')">
    <XIcon
      class="w-5 cursor-pointer text-red-600 text-opacity-70 hover:text-red-700 dark:text-red-700 dark:hover:text-red-600"
      @click="removeTopic(verse)"
    />
  </div>
  <!-- remove topic icon end -->

  <!-- options icon -->
  <!-- <div v-if="icons.includes('options')">
    <DotsHorizontalIcon
      class="w-5 cursor-pointer text-gray-600 text-opacity-70 hover:text-gray-900"
    />
  </div> -->
  <!-- options icon end -->
</template>

<script setup>
// router
import { useRoute, useRouter } from "vue-router";

// store
import { useStore } from "../../store/store";

// components
import {
  ArrowNarrowLeftIcon,
  PlayIcon,
  BookmarkIcon,
  XIcon,
  DuplicateIcon,
  DotsHorizontalIcon,
} from "@heroicons/vue/outline";

import { BookmarkIcon as BookmarkFillIcon } from "@heroicons/vue/solid";

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
    default: ["copyToClipboard", "bookmark"],
  },
});

// router
const router = useRouter();

// route
const route = useRoute();

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

const removeTopic = (verse) => {
  store.removeVerseTopic({ verse_id: verse.id, topic_id: route.params.id });
};
</script>
