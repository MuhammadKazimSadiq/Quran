<template>
  <h1 class="text-center text-3xl dark:text-white">جستجو</h1>

  <!-- Search Panel -->
  <section class="mt-6 flex justify-center">
    <div
      class="flex w-full items-center justify-between rounded border-2 border-gray-400 p-2 text-gray-600 dark:bg-gray-700 md:w-1/2"
    >
      <div class="flex flex-1 justify-start">
        <SearchIcon class="mr-2 text-gray-400 dark:text-gray-100" />
        <input
          @keypress="keypressed"
          class="flex-1 border-0 text-xl focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-white"
          type="text"
          v-model="searchString"
          placeholder="جستجو"
        />
      </div>
      <div>
        <ClearIcon
          class="ml-1 w-8 cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          v-if="searchString.length"
          @click="searchString = ''"
        />
      </div>
    </div>
  </section>

  <!-- Results -->
  <section class="mt-12">
    <TabGroup :selectedIndex="selectedTab" v-if="store.searchResults.length">
      <TabList
        class="flex space-x-1 overflow-x-auto rounded-xl bg-gray-200 p-1 dark:bg-gray-700"
      >
        <Tab
          v-for="(searchResult, i) in store.searchResults"
          as="template"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'flex w-full justify-between rounded-lg p-3 text-lg font-medium leading-5',
              'focus:outline-none focus:ring-0 dark:bg-gray-900',
              selected
                ? 'bg-white text-black shadow dark:text-white'
                : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-800 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100',
            ]"
          >
            <div class="flex-1">{{ searchResult.query }}</div>
            <div>
              <ClearIcon
                @click="removeSearchResult(i)"
                class="w-6 cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
              />
            </div>
          </button>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel
          v-for="searchResult in store.searchResults"
          :class="[
            'rounded-xl bg-white p-3 dark:bg-gray-800',
            'focus:outline-none focus:ring-0',
          ]"
        >
          <div class="p-12">
            <p class="p-4 text-center text-2xl dark:text-white">
              {{ searchResult.verses.length }} مورد
            </p>

            <ul>
              <li
                v-for="verse in searchResult.verses"
                :class="`verse-${verse.verse_id}`"
              >
                <Verse
                  :verse="verse"
                  :icons="['goToVerse', 'copyToClipboard']"
                />
              </li>
            </ul>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </section>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref, nextTick } from "vue";
import { useStore } from "../store/useStore";

import Verse from "../components/Verse.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import ClearIcon from "../components/icons/ClearIcon.vue";

const store = useStore();

const searchString = ref("");
const selectedTab = ref(0);

const keypressed = (e) => {
  if (e.key === "Enter") {
    store.search(searchString.value).then(() => {
      selectedTab.value = store.searchResults.length - 1;
    });
  }
};

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
