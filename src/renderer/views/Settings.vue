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

  <!-- import/ export section -->
  <section class="py-6 px-2">
    <div class="mb-4">
      <h3 class="text-2xl dark:text-white">پشتیبان گیری و بازیابی</h3>
    </div>

    <!-- export -->
    <div class="my-4">
      <div class="my-4">
        <h5 class="text-lg dark:text-white">پشتیبان گیری</h5>
      </div>
      <div class="mr-2 flex flex-col gap-4">
        <div v-for="table in exportableTables" class="flex items-center">
          <input
            class="rounded border border-gray-400 text-gray-600"
            type="checkbox"
            :value="table.id"
            v-model="selectedTables"
          />
          <span class="mr-4 dark:text-white">
            {{ table.name }}
          </span>
        </div>
      </div>
      <button
        @click="exportTable"
        type="button"
        class="mt-4 rounded-md border border-transparent bg-gray-200 py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
      >
        <span>پشتیبان گیری</span>
      </button>
    </div>
    <!-- export end -->
    <!-- import -->
    <div class="my-4">
      <div class="my-4">
        <h5 class="text-lg dark:text-white">بازیابی</h5>
      </div>
      <form @submit.prevent="importTable">
        <div class="flex gap-4">
          <!-- select table input -->
          <select
            v-model="selectedTable"
            class="rounded-lg border-2 border-gray-300/60 text-gray-600 focus:border-gray-700/60 focus:outline-0 focus:ring-0 dark:border-gray-500/60 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-gray-300/60"
          >
            <option :value="0">انتخاب جدول</option>
            <option v-for="table in exportableTables" :value="table.id">
              {{ table.name }}
            </option>
          </select>
          <!-- select table input end -->

          <!-- file input -->
          <input
            type="file"
            class="self-center rounded-lg border-2 border-gray-300/60 text-gray-600 focus:border-gray-700/60 focus:outline-0 focus:ring-0 dark:border-gray-500/60 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-gray-300/60"
          />
          <!-- file input end -->
        </div>
        <button
          type="submit"
          class="mt-4 rounded-md border border-transparent bg-gray-200 py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        >
          <span>بازیابی</span>
        </button>
      </form>
    </div>
    <!-- import end -->
  </section>

  <div class="h-px w-full bg-gray-100"></div>

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
// ipcRenderer
import { ipcRenderer } from "../electron";
// vue
import { ref } from "vue";
// store
import { useStore } from "../store/store";

// store
const store = useStore();

const selectedTables = ref([]);

const exportableTables = ref([
  { id: "bookmarks", name: "نشان شده ها" },
  { id: "topics", name: "موضوعات" },
  { id: "vocabulary", name: "معانی کلمات" },
]);

const selectedTable = ref(0);

const shortcuts = ref([
  { name: "نمایش پنل جستجو", keys: "ctrl + K" },
  { name: "نمایش صفحه تنظیمات", keys: "ctrl + ," },
  { name: "تغییر رنگ پیشزمینه", keys: "ctrl + T" },
]);

const exportTable = () => {
  if (!selectedTables.value.length) return;
  ipcRenderer.invoke("export", {
    tables: JSON.stringify(selectedTables.value),
  });
};
const importTable = (e) => {
  const table = selectedTable.value;
  const path = e.target[1]?.files[0]?.path;

  if (!table || !path) return;

  ipcRenderer.invoke("import", { table, path });
};
</script>
