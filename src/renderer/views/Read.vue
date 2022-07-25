<template>
  <div>
    <div class="text-center text-3xl font-bold dark:text-white">
      سوره {{ getChapter(params.id).name }}
    </div>

    <div class="p-12">
      <ul>
        <li v-for="verse in getVersesByChapter(params.id)">
          <Verse :verse="verse" />
        </li>
      </ul>
    </div>

    <!-- Navigation Buttons -->
    <NavigationButtons :index="params.id" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { storeToRefs } from "pinia";

import { useStore } from "../store/useStore";

import { useScrollTo } from "../composables/scrollTo";

import Verse from "../components/Verse.vue";
import NavigationButtons from "../components/NavigationButtons.vue";

const route = useRoute();
const { params } = storeToRefs(route);

const store = useStore();
const { getVersesByChapter, getChapter } = store;

// change chapterId in store on mount
onMounted(() => {
  store.chapterId = route.params.id;

  // scroll to verse/ page
  setTimeout(() => {
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
  }, 500);
});

// change chapterId in store when navigating to next/ previous chapter
onBeforeRouteUpdate((to, from) => {
  store.chapterId = to.params.id;
});
</script>
