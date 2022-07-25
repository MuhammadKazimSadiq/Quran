<template>
  <h1 class="text-center text-3xl dark:text-white">تنظیمات</h1>

  <!-- translations section -->
  <section class="py-6 px-2">
    <div class="mb-4">
      <h3 class="text-2xl dark:text-white">ترجمه ها</h3>
    </div>
    <div class="mr-2 flex flex-col gap-4">
      <div v-for="translation in translations" class="flex items-center">
        <input
          class="rounded border border-gray-400 text-gray-600"
          type="checkbox"
        />
        <span class="mr-4 dark:text-white">{{ translation.name }}</span>
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
const translations = [
  { id: "en_shakir", name: "Shakir", language: "en" },
  { id: "fa_ansarian", name: "انصاریان", language: "fa" },
  { id: "fa_bahrampour", name: "بهرامپور", language: "fa" },
  { id: "fa_makarem", name: "مکارم", language: "fa" },
  { id: "fa_qaraati", name: "قرائتی", language: "fa" },
];
</script>
