<template>
  <h1 class="text-3xl text-center">تنظیمات</h1>

  <!-- translations section -->
  <section class="py-6 px-2">
    <div class="mb-4">
      <h3 class="text-2xl">ترجمه ها</h3>
    </div>
    <div class="flex flex-col gap-4 mr-2">
      <div v-for="translation in translations" class="flex items-baseline">
        <input class="w-4 h-4" type="checkbox" />
        <span class="mr-4">{{ translation.name }}</span>
      </div>
    </div>
  </section>
  <hr>

</template>

<script setup>
const translations = [
  { id: 'en_shakir', name: 'Shakir', language: 'en'},
  { id: 'fa_ansarian', name: 'انصاریان', language: 'fa'},
  { id: 'fa_bahrampour', name: 'بهرامپور', language: 'fa' },
  { id: 'fa_makarem', name: 'مکارم', language: 'fa'},
  { id: 'fa_qaraati', name: 'قرائتی', language: 'fa'},
]
</script>