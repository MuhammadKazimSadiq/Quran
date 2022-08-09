<template>
  <div>
    <div>
      <ul v-if="verses.length">
        <li
          v-for="(verse, i) in verses"
          :key="verse.id"
          :class="`verse verse-${verse.id}`"
          :data-id="verse.id"
          :data-verse-id="verse.verse_id"
          :data-page-id="verse.page_id"
          :data-section-id="verse.section_id"
        >
          <Verse
            v-if="!lazyLoadVerse || loadedVerses.includes(verse.id)"
            :prevVerse="verses[i - 1] ?? {}"
            :verse="verse"
            :lazyLoad="lazyLoad"
            :loadedVerses="loadedVerses"
            :icons="icons"
            :showTopics="showTopics"
            :showVocabulary="showVocabulary"
            :showBismillah="showBismillah"
            :showSection="showSection"
            :showPage="showPage"
            :showTranslations="showTranslations"
            :translations="enabledTranslations"
            :canEditVocabulary="canEditVocabulary"
            :highlightText="highlightText"
            @toggle-popup="togglePopup"
          />
          <div v-else>
            <div class="flex justify-between gap-4 px-8 py-12">
              <div class="w-3/4 space-y-8">
                <div
                  class="h-3 w-full rounded-lg bg-gray-300 dark:bg-gray-700"
                ></div>
                <div
                  class="h-3 w-full rounded-lg bg-gray-300 dark:bg-gray-700"
                ></div>
                <div
                  class="h-3 w-3/4 rounded-lg bg-gray-300 dark:bg-gray-700"
                ></div>
              </div>
              <div class="flex w-1/4 flex-col items-end space-y-4">
                <div
                  class="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700"
                ></div>
                <div
                  class="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700"
                ></div>
              </div>
            </div>
            <hr />
          </div>
        </li>
      </ul>
    </div>

    <!-- Popup -->
    <Popup ref="popup" :show="show" :position="position">
      <!-- icons -->
      <div class="flex justify-between gap-6 px-2" v-show="!addPanel">
        <div class="cursor-pointer" @click="addPanel = true">
          <PlusIcon class="w-5 text-gray-700 dark:text-gray-300" />
        </div>
        <div class="cursor-pointer" @click="searchSelection()">
          <SearchIcon class="w-5 text-gray-700 dark:text-gray-300" />
        </div>
      </div>
      <!-- icons end -->

      <!-- add panel -->
      <div v-show="addPanel" class="flex flex-col space-y-4">
        <div class="bg-white text-center text-lg text-black dark:bg-gray-800">
          <div class="text-yellow-800 dark:text-yellow-200">
            {{ selectedText.trim() }}
          </div>
        </div>
        <div>
          <input
            type="text"
            class="placeholder-text-gray-500 w-full rounded-xl text-sm"
            placeholder="معنا"
            v-model="meaning"
          />
        </div>
        <button
          @click="addToVocab()"
          class="rounded-xl border border-yellow-800 bg-yellow-50 p-2 dark:border-yellow-50 dark:bg-yellow-800 dark:text-white"
        >
          افزودن به لیست کلمات
        </button>
      </div>
      <!-- add panel end -->
    </Popup>
    <!-- Popup end -->
  </div>
</template>

<script setup>
// vue
import { ref, computed, onMounted, onUnmounted } from "vue";

// composables
import { onClickOutside } from "@vueuse/core";
import { useIntersectionObserver } from "../../composables/intersectionObserver";

// pinia
import { storeToRefs } from "pinia";

// router
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";

// store
import { useStore } from "../../store/store";

// components
import Verse from "./Verse.vue";
import Popup from "../Popup.vue";

import { SearchIcon, PlusIcon } from "@heroicons/vue/outline";

// route
const route = useRoute();
const { params } = storeToRefs(route);

// router
const router = useRouter();

// store
const store = useStore();
const { getVersesByChapter, getChapter } = store;

const props = defineProps({
  verses: {
    type: Array,
    required: true,
    default: [],
  },
  lazyLoad: {
    type: [Boolean, Array],
    default: false,
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
    default: "",
  },
});

// translations
const enabledTranslations = computed(() => {
  return (
    props.translations.length ? props.translations : store.translations
  ).filter((translation) => {
    return store.settings.enabled_translations.includes(translation.name);
  });
});

// lazy load
const lazyLoadVerse = computed(() => {
  return typeof props.lazyLoad == "boolean" && props.lazyLoad;
});

// for lazy load
onBeforeRouteUpdate(() => init());
onMounted(() => init());

const loadedVerses = ref([]);

const init = () => {
  setTimeout(() => {
    // set initial loaded verses
    const INITIAL_LOAD_COUNT = 25;
    loadedVerses.value = props.verses
      .slice(0, INITIAL_LOAD_COUNT)
      .reduce((acc, v) => [...acc, v.id], []);

    // add intersection observer
    addIntersectionObservers();
  }, 1000);
};

let loaderObserver = undefined;
const addIntersectionObservers = () => {
  loaderObserver = useIntersectionObserver({
    elements: document.querySelectorAll(".verse"),
    config: {
      threshold: 0,
      rootMargin: "0px 0px 100px 0px",
    },
    callback: (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const verseId = parseInt(entry.target.dataset.id);

        if (loadedVerses.value.includes(verseId)) {
          return loaderObserver.unobserve(entry.target);
        }

        loadedVerses.value.push(verseId);
        loaderObserver.unobserve(entry.target);
      });
    },
  });
};

onUnmounted(() => loaderObserver?.disconnect());

// vocab
const selectedText = ref(""); // selectedText
const selectedVerse = ref(null); // selectedVerse

const popup = ref(null);
const show = ref(false); // show popup
const position = ref({ x: 0, y: 0 }); // popup position
const addPanel = ref(false); // show add panel

const meaning = ref(""); // meaning input

onClickOutside(popup, () => closePopup());

// on select verse --> show popup
const togglePopup = ({ verse }) => {
  if (
    !props.canEditVocabulary ||
    !window
      .getSelection()
      .anchorNode.parentElement.classList.contains("arabic-verse") ||
    window.getSelection().toString().trim().length === 0 // selection not empty
  ) {
    return;
  }

  // get selected text
  selectedText.value = window.getSelection().toString();

  // get target verse
  selectedVerse.value = verse;

  // get popup dimensions size
  const popupElemDimensions = document
    .querySelector(".popup")
    .getBoundingClientRect();

  // position the popup
  const pos = window.getSelection().getRangeAt(0).getBoundingClientRect();
  position.value = {
    x: pos.x + pos.width / 2 - popupElemDimensions.width / 2,
    y: pos.y + pos.height,
  };

  // show the popup
  show.value = true;
};

// search for selection
const searchSelection = () => {
  store.search(selectedText.value);
  store.searchSelectedTab = store.searchResults.length - 1;
  router.push({ name: "Search" });
};

// add word-meaning to vocab
const addToVocab = async () => {
  await store.addWordToVocab({
    verse_id: selectedVerse.value.id,
    word: selectedText.value,
    meaning: meaning.value,
  });
  closePopup();
};

// close popup
const closePopup = () => {
  show.value = false; // close popup
  addPanel.value = false; // close add panel
  meaning.value = ""; // clear meaning input
};
</script>
