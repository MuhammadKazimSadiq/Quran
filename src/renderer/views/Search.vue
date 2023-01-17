<template>
  <h1 class="text-center text-3xl dark:text-white">جستجو</h1>

  <!-- Search Panel -->
  <section
    class="mt-6 flex flex-col items-center justify-center gap-4 space-y-4 md:flex-row"
  >
    <!-- main search -->
    <div
      class="relative flex w-full items-center justify-between rounded-2xl border-2 border-gray-300/60 p-2 text-gray-600 dark:bg-gray-700 md:w-1/2"
    >
      <!-- right side -->
      <div class="flex flex-1 justify-start">
        <!-- search icon -->
        <MagnifyingGlassIcon
          class="mr-2 w-5 text-gray-400 dark:text-gray-300 dark:hover:text-gray-400"
        />
        <!-- search icon end -->

        <!-- input -->
        <input
          @keypress="keypressed"
          class="flex-1 border-0 text-xl focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          type="text"
          v-model="searchString"
          placeholder="جستجو"
        />
        <!-- input end -->
      </div>
      <!-- right side end -->

      <!-- icon -->
      <div class="ml-2 flex">
        <LoaderIcon
          v-if="searching"
          class="w-6 animate-spin fill-gray-400 text-gray-200 dark:text-gray-600"
        />
        <XMarkIcon
          class="w-8 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          :class="{
            'opacity-100': searchString.length,
            'opacity-0': !searchString.length,
          }"
          @click="searchString = ''"
        />
        <ChevronUpIcon
          @click="advancedSearchPanel = !advancedSearchPanel"
          class="w-8 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          :class="{
            'rotate-180 md:-rotate-90': !advancedSearchPanel,
            'md:rotate-90': advancedSearchPanel,
          }"
        />
      </div>
      <!-- icons end -->
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="searchString.length"
          class="absolute top-[4.2rem] text-sm text-gray-600 dark:text-gray-400"
        >
          برای جستجو <span class="font-english">Enter</span> بزنید
        </div>
      </transition>
    </div>

    <!-- <InformationCircleIcon
      class="w-6 cursor-pointer text-gray-700 dark:text-gray-300"
    /> -->
    <!-- main search end -->

    <!-- advanced search panel -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 translate-x-6 opacity-0"
      enter-to-class="transform scale-100 translate-x-0 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 translate-x-0 opacity-100"
      leave-to-class="transform scale-95 translate-x-6 opacity-0"
    >
      <div v-if="advancedSearchPanel">
        <AdvancedSearchPanel />
      </div>
    </transition>
    <!-- advanced search panel end -->
  </section>
  <!-- Search Panel End -->

  <!-- Results -->
  <section class="mt-12">
    <TabGroup
      :selectedIndex="store.searchSelectedTab"
      v-if="store.searchResults.length"
    >
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
            <div class="flex-1">{{ tabTitle(searchResult.query) }}</div>
            <!-- tab title end -->

            <div>
              <!-- clear icon -->
              <XMarkIcon
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
            <VerseList
              :verses="store.getVerseById(searchResult.verses)"
              :lazyLoad="true"
              :icons="['goToVerse', 'copyToClipboard', 'bookmark']"
              :showTopics="false"
              :showVocabulary="false"
              :showBismillah="false"
              :showSection="false"
              :showPage="false"
              :canEditVocabulary="false"
              :highlightText="searchResult.query"
            />
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
import { ref, computed } from "vue";
// store
import { useStore } from "../store/store";
// router
import { useRoute } from "vue-router";

// components
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/outline";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import VerseList from "../components/verse/VerseList.vue";
import LoaderIcon from "../components/LoaderIcon.vue";
import AdvancedSearchPanel from "../components/AdvancedSearchPanel.vue";

// composables
import { useNotification } from "../composables/notification";

// store
const store = useStore();

// router
const route = useRoute();

// show advanced search panel
const advancedSearchPanel = ref(false);

// is currently searching
const searching = ref(false);

// number of tabs allowed
const TABS_ALLOWED = 10;
const MINIMUM_SEARCH_STRING_LENGTH = 2;

// search - tabs
const searchString = ref("");

const tabTitle = (title) => (Array.isArray(title) ? title[0] : title);

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
    searching.value = true;
    store.search(searchString.value).then(() => {
      searching.value = false;
      store.searchSelectedTab = store.searchResults.length - 1;
    });
  }
};

// onClose Tab
const removeSearchResult = (index) => {
  store.searchResults.splice(index, 1);
  // if closed tab !== activeTab --> return
  if (index !== store.searchSelectedTab) return;

  if (store.searchResults.length) {
    if (index !== 0) {
      setTimeout(() => {
        store.searchSelectedTab = index - 1;
      }, 100);
    }
  }
};
</script>
