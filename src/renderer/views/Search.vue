<template>
  <h1 class="text-center text-3xl dark:text-white">جستجو</h1>

  <!-- Search Panel -->
  <section class="mt-6 flex justify-center">
    <div
      class="flex w-full items-center justify-between rounded-2xl border-2 border-gray-300/60 p-2 text-gray-600 dark:bg-gray-700 md:w-1/2"
    >
      <!-- right side -->
      <div class="flex flex-1 justify-start">
        <!-- search icon -->
        <SearchIcon
          class="mr-2 w-5 text-gray-400 dark:text-gray-100 dark:hover:text-gray-400"
        />
        <!-- search icon end -->

        <!-- input -->
        <input
          @keypress="keypressed"
          class="flex-1 border-0 text-xl focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-white"
          type="text"
          v-model="searchString"
          placeholder="جستجو"
        />
        <!-- input end -->
      </div>
      <!-- right side end -->

      <!-- clear icon -->
      <div>
        <ClearIcon
          class="ml-1 w-8 cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          v-if="searchString.length"
          @click="searchString = ''"
        />
      </div>
      <!-- clear icon end -->
    </div>
  </section>
  <!-- Search Panel End -->

  <!-- Results -->
  <section class="mt-12">
    <TabGroup :selectedIndex="selectedTab" v-if="store.searchResults.length">
      <!-- tabs -->
      <TabList
        class="flex flex-wrap space-x-1 overflow-x-auto rounded-xl bg-gray-200 p-1 dark:bg-gray-700"
      >
        <Tab
          v-for="(searchResult, i) in store.searchResults"
          as="template"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'flex min-w-[150px] flex-1 justify-between rounded-lg p-3 text-lg font-medium leading-5',
              'items-center focus:outline-none focus:ring-0 dark:bg-gray-900',
              selected
                ? 'bg-white text-black shadow dark:text-white'
                : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-800 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100',
            ]"
          >
            <!-- tab title  -->
            <div class="flex-1">{{ searchResult.query }}</div>
            <!-- tab title end -->

            <div>
              <!-- clear icon -->
              <ClearIcon
                @click="removeSearchResult(i)"
                class="w-6 cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
              />
              <!-- clear icon end -->
            </div>
          </button>
        </Tab>
      </TabList>
      <!-- tabs -->

      <!-- tab content -->
      <TabPanels>
        <TabPanel
          v-for="searchResult in store.searchResults"
          :class="[
            'rounded-xl bg-white p-3 dark:bg-gray-800',
            'focus:outline-none focus:ring-0',
          ]"
        >
          <div class="p-12">
            <!-- search results count -->
            <p class="p-4 text-center text-2xl dark:text-white">
              {{ searchResult.verses.length }} مورد
            </p>
            <!-- search results count -->

            <!-- search results -->
            <ul>
              <li
                v-for="verse in searchResult.verses"
                :class="`verse verse-${verse.verse_id}`"
                :key="verse.id"
              >
                <Verse
                  :verse="store.getVerseById(verse)"
                  :highlightText="searchResult.query"
                  :icons="['goToVerse', 'copyToClipboard', 'bookmark']"
                  :showTopics="false"
                  :showVocabulary="false"
                  :lazyLoad="[]"
                />
              </li>
            </ul>
            <!-- search results end -->
          </div>
        </TabPanel>
      </TabPanels>
      <!-- tab content end -->
    </TabGroup>
  </section>
  <!-- Results End -->
</template>

<script setup>
// vue
import { ref, onMounted } from "vue";
// store
import { useStore } from "../store/useStore";
// router
import { useRoute } from "vue-router";

// components
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Verse from "../components/verse/Verse.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import ClearIcon from "../components/icons/ClearIcon.vue";

// composables
import { useNotification } from "../composables/notification";

// store
const store = useStore();

// router
const route = useRoute();

// number of tabs allowed
const TABS_ALLOWED = 10;
const MINIMUM_SEARCH_STRING_LENGTH = 2;

// search - tabs
const searchString = ref("");
const selectedTab = ref(0);

onMounted(() => {
  // if pre-search --> switch to last tab
  if (route.query?.changeTab)
    selectedTab.value = store.searchResults.length - 1;
});

const keypressed = (e) => {
  if (e.key === "Enter") {
    // check if search string is long enough
    if (searchString.value.length < MINIMUM_SEARCH_STRING_LENGTH) {
      return useNotification(
        `عبارت جستجو باید حد اقل ${MINIMUM_SEARCH_STRING_LENGTH} حرف باشد`,
        {
          type: "warning",
        }
      );
    }
    // check number of tabs allowed
    if (store.searchResults.length >= TABS_ALLOWED) {
      return useNotification(`حداکثر ${TABS_ALLOWED} جستجو ممکن است`, {
        type: "warning",
      });
    }
    store.search(searchString.value).then(() => {
      selectedTab.value = store.searchResults.length - 1;
    });
  }
};

// onClose Tab
const removeSearchResult = (index) => {
  store.searchResults.splice(index, 1);
  // if closed tab !== activeTab --> return
  if (index !== selectedTab.value) return;

  if (store.searchResults.length) {
    if (index !== 0) {
      setTimeout(() => {
        selectedTab.value = index - 1;
      }, 100);
    }
  }
};
</script>
