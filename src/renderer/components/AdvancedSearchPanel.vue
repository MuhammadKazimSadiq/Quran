<template>
  <div>
    <!-- title -->
    <div class="mb-6 text-center text-2xl text-black dark:text-white">
      جستجوی پیشرفته
    </div>
    <!-- title end -->

    <!-- fields -->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        class="flex items-center rounded-2xl border-2 border-gray-300/60 p-1 text-gray-600 dark:bg-gray-700"
      >
        <input
          v-model="searchExact"
          class="w-full flex-1 border-0 text-lg focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          type="text"
          placeholder="عبارت"
        />
        <ClearIcon
          class="ml-2 h-6 w-6 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          :class="{
            'opacity-100': searchExact.length,
            'opacity-0': !searchExact.length,
          }"
          @click="searchExact = ''"
        />
      </div>
      <div
        class="flex items-center rounded-2xl border-2 border-gray-300/60 p-1 text-gray-600 dark:bg-gray-700"
      >
        <input
          v-model="searchAllWords"
          class="w-full flex-1 border-0 text-lg focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          type="text"
          placeholder="همه کلمات"
        />
        <ClearIcon
          class="ml-2 h-6 w-6 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          :class="{
            'opacity-100': searchAllWords.length,
            'opacity-0': !searchAllWords.length,
          }"
          @click="searchAllWords = ''"
        />
      </div>
      <div
        class="flex items-center rounded-2xl border-2 border-gray-300/60 p-1 text-gray-600 dark:bg-gray-700"
      >
        <input
          v-model="searchAnyWord"
          class="w-full flex-1 border-0 text-lg focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          type="text"
          placeholder="بعضی از کلمات"
        />
        <ClearIcon
          class="ml-2 h-6 w-6 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          :class="{
            'opacity-100': searchAnyWord.length,
            'opacity-0': !searchAnyWord.length,
          }"
          @click="searchAnyWord = ''"
        />
      </div>
      <div class="flex gap-1">
        <select
          v-model="searchNotType"
          class="flex items-center rounded-2xl border-2 border-gray-300/60 p-1 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        >
          <option value="notExact">بدون عبارت</option>
          <option value="notWords">بدون کلمات</option>
        </select>
        <div
          class="flex items-center rounded-2xl border-2 border-gray-300/60 p-1 text-gray-600 dark:bg-gray-700"
        >
          <input
            v-model="searchNot"
            class="w-full flex-1 border-0 text-lg focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
            type="text"
            placeholder="بدون کلمات/ عبارت"
          />
          <ClearIcon
            class="ml-2 h-6 w-6 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
            :class="{
              'opacity-100': searchNot.length,
              'opacity-0': !searchNot.length,
            }"
            @click="searchNot = ''"
          />
        </div>
      </div>
      <div
        class="flex items-center rounded-2xl border-2 border-gray-300/60 p-1 text-gray-600 dark:bg-gray-700"
      >
        <input
          v-model="searchStartWith"
          class="w-full flex-1 border-0 text-lg focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          type="text"
          placeholder="ابتداء با"
        />
        <ClearIcon
          class="ml-2 h-6 w-6 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          :class="{
            'opacity-100': searchStartWith.length,
            'opacity-0': !searchStartWith.length,
          }"
          @click="searchStartWith = ''"
        />
      </div>
      <div
        class="flex items-center rounded-2xl border-2 border-gray-300/60 p-1 text-gray-600 dark:bg-gray-700"
      >
        <input
          v-model="searchEndWith"
          class="w-full flex-1 border-0 text-lg focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          type="text"
          placeholder="انتهاء با"
        />
        <ClearIcon
          class="ml-2 h-6 w-6 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
          :class="{
            'opacity-100': searchEndWith.length,
            'opacity-0': !searchEndWith.length,
          }"
          @click="searchEndWith = ''"
        />
      </div>
    </div>
    <!-- fields end -->

    <!-- search button -->
    <div class="flex justify-center">
      <button
        :disabled="searching"
        @click="search()"
        class="mt-8 flex w-40 cursor-pointer justify-center rounded-md border-2 border-gray-500 border-opacity-20 px-4 py-2 text-center hover:border-opacity-100 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:hover:border-gray-800 dark:hover:bg-gray-800"
      >
        <span v-if="!searching">جستجو</span>
        <LoaderIcon
          v-if="searching"
          class="w-6 animate-spin fill-gray-400 text-gray-200 dark:text-gray-600"
        />
      </button>
    </div>
    <!-- search button end -->
  </div>
</template>

<script setup>
// vue
import { ref } from "vue";

// store
import { useStore } from "../store/store";

// components
import ClearIcon from "./icons/ClearIcon.vue";
import LoaderIcon from "./icons/LoaderIcon.vue";

// store
const store = useStore();

const searching = ref(false);

const searchExact = ref("");
const searchAllWords = ref("");
const searchAnyWord = ref("");
const searchNotType = ref("notExact");
const searchNot = ref("");
const searchStartWith = ref("");
const searchEndWith = ref("");

const search = () => {
  // if inputs empty
  if (
    !searchExact.value.length &&
    !searchAllWords.value.length &&
    !searchAnyWord.value.length &&
    !searchNot.value.length &&
    !searchStartWith.value.length &&
    !searchEndWith.value.length
  )
    return;

  searching.value = true;

  let verses = store.verses;

  // exact search
  if (searchExact.value) {
    // remove diacritics from query
    searchExact.value.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();
    verses = verses.filter((verse) =>
      verse.text_clean.includes(searchExact.value)
    );
  }

  // AND search
  if (searchAllWords.value) {
    // remove diacritics from query
    let regex = searchAllWords.value
      .split(" ")
      .reduce((acc, word) => (acc += `(?=.*${word})`), "");
    searchAllWords.value.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();
    verses = verses.filter((verse) => new RegExp(regex).test(verse.text_clean));
  }

  // OR search
  if (searchAnyWord.value) {
    // remove diacritics from query
    searchAnyWord.value.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();
    verses = verses.filter((verse) =>
      new RegExp(`${searchAnyWord.value.split(" ").join("|")}`).test(
        verse.text_clean
      )
    );
  }

  // starts with search
  if (searchStartWith.value) {
    // remove diacritics from query
    searchStartWith.value.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();
    verses = verses.filter((verse) =>
      new RegExp(`^${searchStartWith.value}`).test(verse.text_clean)
    );
  }

  // ends with search
  if (searchEndWith.value) {
    // remove diacritics from query
    searchEndWith.value.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();
    verses = verses.filter((verse) =>
      new RegExp(`${searchEndWith.value}$`).test(verse.text_clean)
    );
  }

  // NOT search
  if (searchNot.value && searchNotType.value) {
    // remove diacritics from query
    searchNot.value.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();

    if (searchNotType.value === "notExact") {
      verses = verses.filter(
        (verse) => !verse.text_clean.includes(searchNot.value)
      );
    }

    if (searchNotType.value === "notWords") {
      let regex = searchNot.value
        .split(" ")
        .reduce((acc, word) => (acc += `(?=.*${word})`), "");
      verses = verses.filter(
        (verse) => !new RegExp(regex).test(verse.text_clean)
      );
    }
  }

  const fields = [
    { name: "searchExact", value: searchExact.value },
    { name: "searchAllWords", value: searchAllWords.value },
    { name: "searchAnyWord", value: searchAnyWord.value },
    { name: "searchStartWith", value: searchStartWith.value },
    { name: "searchEndWith", value: searchEndWith.value },
    { name: "searchNot", value: searchNot.value },
  ];

  let query = [];
  fields.forEach(({ name, value }) => {
    if (!value.length || name === "searchNot") return;

    if (name === "searchAllWords" || name === "searchAnyWord") {
      return query.push(...value.split(" "));
    }

    query.push(value);
  });

  store.addToSearchResults({ verses, query });
  store.searchSelectedTab = store.searchResults.length - 1;
  searching.value = false;
};
</script>
