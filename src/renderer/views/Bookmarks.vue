<template>
  <h1 class="text-center text-3xl dark:text-white">نشان شده ها</h1>

  <section class="mt-4">
    <ul v-if="store.getBookmarkedVerses.length">
      <li v-for="verse in store.getBookmarkedVerses">
        <Verse
          :verse="verse"
          :icons="['goToVerse', 'copyToClipboard', 'bookmark']"
        />
      </li>
    </ul>
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
import Verse from "../components/Verse.vue";

// store
const store = useStore();
</script>
