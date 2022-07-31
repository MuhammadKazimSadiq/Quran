<template>
  <h1 class="text-center text-3xl dark:text-white">تنظیمات</h1>

  <!-- translations section -->
  <section class="py-6 px-2">
    <div class="mb-4">
      <h3 class="text-2xl dark:text-white">ترجمه ها</h3>
    </div>
    <div class="mr-2 flex flex-col gap-4">
      <div v-for="translation in store.translations" class="flex items-center">
        <input
          class="rounded border border-gray-400 text-gray-600"
          type="checkbox"
          :value="translation.name"
          v-model="store.enabledTranslations"
        />
        <span class="mr-4 dark:text-white">{{ translation.translator }}</span>
      </div>
    </div>
  </section>

  <hr />

  <!-- search section -->
  <section></section>

  <!-- shortcuts section -> view-only -->
  <section></section>
</template>

<script setup>
// store
import { useStore } from "../store/useStore";

// store
const store = useStore();
</script>
