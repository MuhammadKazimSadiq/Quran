<template>
  <!-- title -->
  <div class="text-center text-3xl font-bold dark:text-white">
    سوره {{ getChapter(params.id)?.name }}
  </div>
  <!-- title end -->

  <!-- verses section -->
  <div class="p-12">
    <ul>
      <li
        v-for="verse in getVersesByChapter(params.id)"
        :key="verse.id"
        :class="`verse verse-${verse.verse_id}`"
        :data-verse-id="verse.verse_id"
        :data-page-id="`${verse.page_id}`"
        :data-section-id="`${verse.section_id}`"
      >
        <Verse
          @toggle-popup="select"
          :verse="verse"
          :loadedVerses="loadedVerses"
          :icons="['copyToClipboard', 'bookmark']"
          :showTopics="true"
          :showVocabulary="true"
          :lazyLoad="['topics']"
        />
      </li>
    </ul>
  </div>
  <!-- verses section end -->

  <!-- Navigation Buttons -->
  <NavigationButtons :index="params.id" />

  <!-- Popup -->
  <Popup ref="popup" :show="show" :position="position">
    <!-- icons -->
    <div class="flex justify-between gap-6 px-2" v-show="!addPanel">
      <div class="cursor-pointer" @click="add()">
        <PlusIcon class="w-5 text-gray-700 dark:text-gray-300" />
      </div>
      <div class="cursor-pointer" @click="search()">
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
</template>

<script setup>
// vue
import { ref, onMounted, toRefs, watch, computed } from "vue";
// router
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
// pinia
import { storeToRefs } from "pinia";
// store
import { useStore } from "../store/useStore";

// composables
import { useScroll } from "@vueuse/core";
import { useScrollTo } from "../composables/scrollTo";
import { onClickOutside } from "@vueuse/core";
import { useIntersectionObserver } from "../composables/intersectionObserver";

import Verse from "../components/Verse.vue";
import NavigationButtons from "../components/NavigationButtons.vue";
import Popup from "../components/Popup.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import PlusIcon from "../components/icons/PlusIcon.vue";

// route
const route = useRoute();
const { params } = storeToRefs(route);

// router
const router = useRouter();

// store
const store = useStore();
const { getVersesByChapter, getChapter } = store;

onMounted(() => init({ route }));
onBeforeRouteUpdate((to, from) => {
  init({ route: to });
  loadedVerses.value = Array.from({ length: 10 }, (_, i) => i + 1);
});

store.$subscribe(
  (mutation, state) => {
    if (mutation?.payload?.scrollTo) scrollTo();
  },
  { detached: true }
);

const init = ({ route }) => {
  // change chapterId, pageId and sectionId in store when navigating to next/ previous chapter
  store.chapterId = route.params.id;
  store.pageId = getChapter(route.params.id)?.page;
  store.sectionId = getChapter(route.params.id)?.section;

  // scroll
  scrollTo();

  // add intersection observers - after slight delay
  setTimeout(() => addIntersectionObservers(), 1000);
};

const scrollTo = () => {
  // scroll to verse/ page - after slight delay
  setTimeout(() => {
    // scroll to verse/ page
    if (
      Object.keys(store.scrollTo).length &&
      store.scrollTo.hasOwnProperty("verse") &&
      document.querySelector(`.verse-${store.scrollTo.verse}`)
    ) {
      const el = document.querySelector(`.verse-${store.scrollTo.verse}`);
      useScrollTo(el);

      el.classList.add("bg-yellow-100", "dark:bg-yellow-800/60");

      store.scrollTo = {};
    }
  }, 100);
};

// loaded verses
const loadedVerses = ref(Array.from({ length: 10 }, (_, i) => i + 1));

// on scroll - show/ hide nav
const el = ref(document);
const { directions } = useScroll(el);
const { top, bottom } = toRefs(directions); // get the scroll directions

const nav = document.querySelector("nav");
watch(directions, (newVal, oldVal) => {
  if (!newVal) return;

  if (top.value) nav.classList.remove("-translate-y-[68px]");
  if (bottom.value) nav.classList.add("-translate-y-[68px]");
});

// on routeLeave --> remove class from nav
onBeforeRouteLeave(() => nav.classList.remove("-translate-y-[68px]"));

// intersection observers
const addIntersectionObservers = () => {
  // for changing page and section in top nav
  const navObserver = useIntersectionObserver({
    elements: document.querySelectorAll(".verse"),
    config: { threshold: 0.5 },
    callback: (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        store.pageId = entry.target.dataset.pageId;
        store.sectionId = entry.target.dataset.sectionId;
      });
    },
  });

  // for loading verses
  const loaderObserver = useIntersectionObserver({
    elements: document.querySelectorAll(".verse"),
    config: {
      threshold: 0,
      rootMargin: "0px 0px 100px 0px",
    },
    callback: (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (loadedVerses.value.includes(parseInt(entry.target.dataset.verseId)))
          return loaderObserver.unobserve(entry.target);

        loadedVerses.value.push(parseInt(entry.target.dataset.verseId));
        loaderObserver.unobserve(entry.target);
      });
    },
  });
};

const selectedText = ref(""); // selectedText
const selectedVerse = ref(null); // selectedVerse
const targetElement = ref(null); // clicked element

const popup = ref(null);
const show = ref(false); // show popup
const position = ref({ x: 0, y: 0 }); // popup position

const meaning = ref(""); // meaning input

onClickOutside(popup, (event) => {
  show.value = false;
  addPanel.value = false;
});

// onSelect verse --> show popup
const select = ({ event, verse }) => {
  if (
    !window
      .getSelection()
      .anchorNode.parentElement.classList.contains("arabic-verse") ||
    window.getSelection().toString().trim().length === 0
  ) {
    return;
  }
  // save selected text
  selectedText.value = window.getSelection().toString();

  // save target element
  targetElement.value = event.target;

  // save target verse
  selectedVerse.value = verse;

  let popupElemDimensions = document
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

const addPanel = ref(false);
// on click Add Button --> show add panel
const add = () => {
  addPanel.value = true;
};

// on search
const search = () => {
  store.search(selectedText.value);
  router.push({ name: "Search", query: { changeTab: true } });
};

// add word-meaning to vocab
const addToVocab = async () => {
  await store.addWordToVocab({
    verse_id: selectedVerse.value.id,
    word: selectedText.value,
    meaning: meaning.value,
  });
  show.value = false;
  addPanel.value = false;
};
</script>
