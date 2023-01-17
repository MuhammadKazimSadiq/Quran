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
          @change="store.updateTranslations()"
          v-model="store.settings.enabled_translations"
        />
        <span
          class="mr-4 dark:text-white"
          :class="{ 'font-english': translation.language === 'en' }"
        >
          {{ translation.translator }}
        </span>
      </div>
    </div>
  </section>

  <div class="h-px w-full bg-gray-100"></div>

  <!-- search section -->
  <section></section>

  <!-- shortcuts section (view-only) -->
  <section class="py-6 px-2">
    <div class="mb-4">
      <h3 class="text-2xl dark:text-white">میانبرها</h3>
    </div>
    <div class="mr-2">
      <div
        v-for="shortcut in shortcuts"
        class="my-4 flex w-1/3 justify-between gap-8"
      >
        <div class="text-lg dark:text-white">{{ shortcut.name }}:</div>
        <div
          dir="ltr"
          class="rounded-md bg-gray-200 py-1 px-2 font-english text-xs"
        >
          <kbd>{{ shortcut.keys }}</kbd>
        </div>
      </div>
    </div>
  </section>

  <div class="h-px w-full bg-gray-100"></div>
</template>

<script setup>
// vue
import { ref } from "vue";
// store
import { useStore } from "../store/store";

// store
const store = useStore();

const shortcuts = ref([
  { name: "نمایش پنل جستجو", keys: "ctrl + K" },
  { name: "نمایش صفحه تنظیمات", keys: "ctrl + ," },
  { name: "تغییر رنگ پیشزمینه", keys: "ctrl + T" },
]);
</script>
