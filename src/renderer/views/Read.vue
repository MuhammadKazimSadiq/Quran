<template>
  <!-- title -->
  <div class="text-center text-3xl font-bold dark:text-white">
    سوره {{ getChapter(params.id)?.name }}
  </div>
  <!-- title end -->

  <!-- verses list section -->
  <div class="p-12">
    <!-- tabs -->
    <TabGroup :selectedIndex="selectedView" @change="changeView">
      <TabList
        class="mx-auto flex w-full justify-center space-x-1 rounded-3xl bg-gray-700/20 p-1 md:w-1/2"
      >
        <Tab
          v-for="view in ['ترجمه', 'مصحف']"
          as="template"
          :key="view"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full rounded-3xl py-2.5 text-sm font-medium leading-5 text-gray-700 ring-0 focus:outline-none focus:ring-0',
              selected
                ? 'bg-white shadow dark:bg-gray-700 dark:text-white'
                : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100',
            ]"
          >
            {{ view }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-8">
        <!-- normal view -->
        <TabPanel class="ring-0 focus:outline-none focus:ring-0">
          <VerseList
            :verses="getVersesByChapter(params.id)"
            :lazyLoad="['topics']"
            :icons="['play', 'copyToClipboard', 'bookmark']"
          />
        </TabPanel>
        <!-- normal view end -->

        <!-- mushaf view -->
        <TabPanel class="ring-0 focus:outline-none focus:ring-0">
          <!-- Mushaf -->
          <Mushaf />
          <!-- Mushaf end -->
        </TabPanel>
        <!-- mushaf view end -->
      </TabPanels>
    </TabGroup>
    <!-- tabs end -->
  </div>
  <!-- verses list section end -->

  <!-- Navigation Buttons -->
  <NavigationButtons :index="params.id" />
</template>

<script setup>
// vue
import {
  ref,
  toRefs,
  watch,
  computed,
  onMounted,
  onUnmounted,
  defineAsyncComponent,
} from "vue";
// router
import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
// pinia
import { storeToRefs } from "pinia";
// store
import { useStore } from "../store/store";

// composables
import { useScroll } from "@vueuse/core";
import { useScrollTo } from "../composables/scrollTo";
import { useIntersectionObserver } from "../composables/intersectionObserver";

// components
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import VerseList from "../components/verse/VerseList.vue";

const Mushaf = defineAsyncComponent(() =>
  import("../components/verse/Mushaf.vue")
);
import NavigationButtons from "../components/NavigationButtons.vue";

// route
const route = useRoute();
const { params } = storeToRefs(route);

// store
const store = useStore();
const { getVersesByChapter, getChapter } = store;

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

onMounted(() => init({ route }));
onBeforeRouteUpdate((to, from) => init({ route: to }));

const init = ({ route }) => {
  // change chapterId, pageId and sectionId in store when navigating to next/ previous chapter
  store.chapterId = route.params.id;
  store.pageId = getChapter(route.params.id)?.page;
  store.sectionId = getChapter(route.params.id)?.section;

  // scroll
  scrollTo();

  // add intersection observers - after slight delay
  setTimeout(() => addIntersectionObservers(), 1000);

  // get words of chapter --> for mushaf view
  store.getChapterWords(route.params.id);
};

store.$subscribe(
  (mutation, state) => {
    if (mutation?.payload?.scrollTo) scrollTo();
  },
  { detached: true }
);

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

let navObserver = undefined;
const addIntersectionObservers = () => {
  // for changing page and section in top nav

  // check current view (translation or mushaf)
  const elements =
    selectedView.value === 0
      ? document.querySelectorAll(".verse")
      : document.querySelectorAll(".page");

  navObserver = useIntersectionObserver({
    elements,
    config: { threshold: 0.5 },
    callback: (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        store.pageId = entry.target.dataset.pageId;
        store.sectionId = entry.target.dataset.sectionId;
      });
    },
  });
};

onUnmounted(() => navObserver?.disconnect());

const selectedView = ref(0);
const changeView = (index) => {
  selectedView.value = index;
  setTimeout(() => addIntersectionObservers(), 500);
};
</script>
