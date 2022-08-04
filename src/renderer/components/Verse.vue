<template>
  <div>
    <!-- bismillah (if first verse and not surah fatiha)  -->
    <div
      v-if="verse.verse_id === 1 && verse.chapter_id !== 1"
      class="my-4 flex justify-center text-center"
    >
      <Bismillah />
    </div>
    <div class="flex justify-between gap-12 rounded-lg p-4 pb-8">
      <!-- verse -->
      <div class="flex-1 gap-2">
        <div
          class="arabic-verse my-12 font-arabic text-3xl leading-loose dark:text-white"
          @contextmenu="$emit('togglePopup', { event: $event, verse })"
          v-html="parseVerse(verse)"
        ></div>

        <!-- translations -->
        <Translation
          v-for="translation in store.translations"
          :text="verse[translation.name]"
          :translation="translation"
        />
        <!-- translations end -->

        <!-- topics -->
        <div v-if="showTopics">
          <VerseTopics
            :verseId="verse.id"
            :topics="verse.topics"
            :lazy-load="lazyLoad.includes('topics')"
            :loaded="loadedVerses.includes(verse.verse_id)"
          />
        </div>
        <!-- topics end -->
      </div>
      <!-- verse end -->

      <!-- vocab -->
      <div v-if="showVocabulary" class="mt-6 flex flex-col gap-3">
        <VerseVocabulary :vocab="verse.vocab" />
      </div>
      <!-- vocab end -->

      <!-- left side -->
      <div class="mt-8 flex flex-col gap-6">
        <!-- chapter:verse -->
        <div class="text-md text-gray-600 text-opacity-70 dark:text-gray-200">
          {{ verse.chapter_id }}:{{ verse.verse_id }}
        </div>

        <!-- icons -->
        <VerseIcons :verse="verse" :icons="icons" />
        <!-- icons end -->
      </div>
      <!-- left side end -->
    </div>
    <!-- hr -->
    <div class="h-px w-full bg-gray-100"></div>
  </div>
</template>

<script setup>
// vue
import { defineProps, defineEmits } from "vue";

// store
import { useStore } from "../store/useStore";

// composables
import { useHighlight } from "../composables/highlight";

// components
import Translation from "./Translation.vue";
import VerseTopics from "./VerseTopics.vue";
import VerseVocabulary from "./VerseVocabulary.vue";
import VerseIcons from "./VerseIcons.vue";
import Bismillah from "./Bismillah.vue";

const emits = defineEmits(["togglePopup"]);

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
  loadedVerses: {
    type: Array,
    default: () => [],
  },
  lazyLoad: {
    type: Array,
    default: () => [],
  },
  highlightText: {
    type: String,
    required: false,
  },
  showTopics: {
    type: Boolean,
    default: true,
  },
  showVocabulary: {
    type: Boolean,
    default: true,
  },
});

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
</script>
