<template>
  <h1 class="text-center text-3xl dark:text-white">نشان شده ها</h1>

  <section class="mt-4">
    <VerseList
      v-if="store.getBookmarkedVerses.length"
      :verses="store.getBookmarkedVerses"
      :lazyLoad="true"
      :icons="['goToVerse', 'copyToClipboard', 'bookmark']"
      :showTopics="false"
      :showVocabulary="false"
      :showBismillah="false"
      :canEditVocabulary="false"
    />
    <div v-else>
      <p class="p-8 text-center text-2xl dark:text-white">
        شما هیچ نشان شده ای ندارید.
      </p>
    </div>
  </section>
</template>

<script setup>
// store
import { useStore } from "../store/useStore";

// components
import VerseList from "../components/verse/VerseList.vue";

// store
const store = useStore();
</script>
