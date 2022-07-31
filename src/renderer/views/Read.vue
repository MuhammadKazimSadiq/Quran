<template>
  <div>
    <!-- title -->
    <div class="text-center text-3xl font-bold dark:text-white">
      سوره {{ getChapter(params.id)?.name }}
    </div>
    <!-- title end -->

    <!-- verses section end -->
    <div class="p-12">
      <ul>
        <li v-for="verse in getVersesByChapter(params.id)">
          <Verse :verse="verse" />
        </li>
      </ul>
    </div>
    <!-- verses section end -->

    <!-- Navigation Buttons -->
    <NavigationButtons :index="params.id" />
  </div>
</template>

<script setup>
// vue
import { ref, onMounted, toRefs, watch } from "vue";
// router
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
// pinia
import { storeToRefs } from "pinia";
// store
import { useStore } from "../store/useStore";

// composables
import { useScroll } from "@vueuse/core";
import { useScrollTo } from "../composables/scrollTo";

// components
import Verse from "../components/Verse.vue";
import NavigationButtons from "../components/NavigationButtons.vue";

// route
const route = useRoute();
const { params } = storeToRefs(route);

// store
const store = useStore();
const { getVersesByChapter, getChapter } = store;

onMounted(() => init({ route }));
onBeforeRouteUpdate((to, from) => init({ route: to }));

const init = ({ route }) => {
  // change chapterId and pageId in store when navigating to next/ previous chapter
  store.chapterId = route.params.id;
  store.pageId = getChapter(route.params.id)?.page;

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

  // add intersection observers - after slight delay
  setTimeout(() => addIntersectionObservers(), 1000);
};

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
onBeforeRouteLeave(() => {
  nav.classList.remove("-translate-y-[68px]");
});

// intersection observers
const addIntersectionObservers = () => {
  let options = { threshold: 0.5 };
  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      store.pageId = entry.target.dataset.pageId;
    });
  }, options);

  let elements = document.querySelectorAll(".verse");
  elements.forEach((elem) => observer.observe(elem));
};
</script>
