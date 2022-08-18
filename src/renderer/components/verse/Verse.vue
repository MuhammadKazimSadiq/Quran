<template>
  <div>
    <!-- new page and section -->
    <div
      v-if="(showPage || showSection) && (isNewPage || isNewSection)"
      class="mt-4 flex flex-col gap-4 rounded-2xl bg-gray-100 p-4 text-center dark:bg-gray-800"
    >
      <div
        v-if="showSection && isNewSection"
        class="right-16 text-xl text-yellow-800 dark:text-yellow-300"
      >
        جزء {{ verse.section_id }}
      </div>
      <div
        v-if="showPage && isNewPage"
        class="right-16 text-xl text-yellow-800 dark:text-yellow-300"
      >
        صفحه {{ verse.page_id }}
      </div>
    </div>

    <!-- bismillah (if first verse and not surah fatiha)  -->
    <div
      v-if="verse.verse_id === 1 && verse.chapter_id !== 1 && showBismillah"
      class="my-4 flex justify-center text-center text-black dark:text-white"
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
        <div v-if="showTranslations">
          <Translation
            v-for="translation in translations"
            :text="verse[translation.name]"
            :translation="translation"
          />
        </div>
        <!-- translations end -->

        <!-- topics -->
        <div v-if="showTopics">
          <VerseTopics
            :verseId="verse.id"
            :topics="verse.topics"
            :lazyLoad="lazyLoad.includes('topics')"
            :loaded="loadedVerses.includes(verse.id)"
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
    <div class="h-px w-full bg-gray-100 dark:bg-gray-700"></div>
    <!-- hr end -->
  </div>
</template>

<script setup>
// vue
import { computed } from "vue";
// store
import { useStore } from "../../store/store";

// composables
import { useHighlight } from "../../composables/highlight";

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
  prevVerse: {
    type: Object,
    default: {},
  },
  lazyLoad: {
    type: [Array, Boolean],
    default: [],
  },
  loadedVerses: {
    type: Array,
    default: [],
  },
  showBismillah: {
    type: Boolean,
    default: true,
  },
  showSection: {
    type: Boolean,
    default: true,
  },
  showPage: {
    type: Boolean,
    default: true,
  },
  showTranslations: {
    type: Boolean,
    default: true,
  },
  translations: {
    type: Array,
    default: [],
  },
  icons: {
    type: Array,
    default: ["copyToClipboard", "bookmark"],
  },
  showTopics: {
    type: Boolean,
    default: true,
  },
  showVocabulary: {
    type: Boolean,
    default: true,
  },
  canEditVocabulary: {
    type: Boolean,
    default: true,
  },
  highlightText: {
    type: [String, Array],
    required: false,
  },
});

// store
const store = useStore();

const isNewPage = computed(() => {
  if (!Object.keys(props.prevVerse).length) {
    const prevVerse = store.verses.find(
      (verse) => verse.id === props.verse.id - 1
    );
    if (!prevVerse) return true;
    return prevVerse.page_id !== props.verse.page_id;
  }
  return props.verse.page_id !== props.prevVerse.page_id;
});

const isNewSection = computed(() => {
  if (!Object.keys(props.prevVerse).length) {
    const prevVerse = store.verses.find(
      (verse) => verse.id === props.verse.id - 1
    );
    if (!prevVerse) return true;
    return prevVerse.section_id !== props.verse.section_id;
  }
  return props.verse.section_id !== props.prevVerse.section_id;
});

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
