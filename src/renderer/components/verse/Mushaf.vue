<template>
  <div class="w-full">
    <div
      v-for="{ page, section, lines } in pages"
      class="page text-center"
      :data-page-id="page"
      :data-section-id="section"
    >
      <MushafPage :lines="lines" :page="page" :loadedPages="loadedPages" />
    </div>
  </div>
</template>

<script setup>
// vue
import { ref, computed, onMounted, onUnmounted } from "vue";

// router
import { onBeforeRouteUpdate } from "vue-router";

// store
import { useStore } from "../../store/store";

// composables
import { useIntersectionObserver } from "../../composables/intersectionObserver";

// components
import MushafPage from "./MushafPage.vue";

// store
const store = useStore();

const pages = computed(() => {
  return store.words[store.chapterId - 1]?.reduce((page, word) => {
    if (page[word["page"]] && page[word["page"]]["lines"][word["line"]]) {
      page[word["page"]]["lines"][word["line"]].push(word["text"]);
    } else if (page[word["page"]]) {
      page[word["page"]]["lines"][word["line"]] = [];
      page[word["page"]]["lines"][word["line"]].push(word["text"]);
    } else {
      page[word["page"]] = {
        page: word["page"],
        section: word["section"],
        lines: [],
      };
      page[word["page"]]["lines"][word["line"]] = [];
      page[word["page"]]["lines"][word["line"]].push(word["text"]);
    }
    return page;
  }, {});
});

// for lazy load
onBeforeRouteUpdate(() => init());
onMounted(() => init());

const loadedPages = ref([]);

const init = () => {
  setTimeout(() => {
    // set initial loaded verses
    const INITIAL_LOAD_COUNT = 5;
    loadedPages.value = Object.keys(pages.value)
      .slice(0, INITIAL_LOAD_COUNT)
      .reduce((acc, v) => [...acc, parseInt(v)], []);

    // add intersection observer
    addIntersectionObservers();
  }, 500);
};

let loaderObserver = undefined;
const addIntersectionObservers = () => {
  loaderObserver = useIntersectionObserver({
    elements: document.querySelectorAll(".page"),
    config: {
      threshold: 0,
      rootMargin: "0px 0px 100px 0px",
    },
    callback: (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const pageId = parseInt(entry.target.dataset.pageId);

        if (loadedPages.value.includes(pageId)) {
          return loaderObserver.unobserve(entry.target);
        }

        loadedPages.value.push(pageId);
        loaderObserver.unobserve(entry.target);

        console.log(loadedPages.value);
      });
    },
  });
};

onUnmounted(() => loaderObserver?.disconnect());
</script>
