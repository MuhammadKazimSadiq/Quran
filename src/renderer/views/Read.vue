<template>
  <!-- title -->
  <div class="text-center text-3xl font-bold dark:text-white">
    سوره {{ getChapter(params.id)?.name }}
  </div>
  <!-- title end -->

  <!-- verses list section -->
  <div class="p-12">
    <VerseList :verses="getVersesByChapter(params.id)" :lazyLoad="['topics']" />
  </div>
  <!-- verses list section end -->

  <!-- Navigation Buttons -->
  <NavigationButtons :index="params.id" />
</template>

<script setup>
// vue
import { ref, toRefs, watch, onMounted, onUnmounted } from "vue";
// router
import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
// pinia
import { storeToRefs } from "pinia";
// store
import { useStore } from "../store/useStore";

// composables
import { useScroll } from "@vueuse/core";
import { useScrollTo } from "../composables/scrollTo";
import { useIntersectionObserver } from "../composables/intersectionObserver";

// components
import VerseList from "../components/verse/VerseList.vue";
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
  navObserver = useIntersectionObserver({
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
};

onUnmounted(() => navObserver?.disconnect());
</script>
