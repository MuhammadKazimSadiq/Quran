<template>
  <div class="mb-8">
    <!-- line -->
    <template v-if="loadedPages.includes(page)">
      <div
        v-for="line in lines"
        class="font-arabic text-xl leading-loose dark:text-white lg:text-3xl lg:leading-loose"
      >
        {{ line?.join(" ") }}
      </div>
    </template>
    <div v-else class="mx-auto w-full lg:w-1/2">
      <div v-for="i of 10">
        <div
          class="my-8 h-6 w-full rounded-lg bg-gray-300 dark:bg-gray-700"
        ></div>
      </div>
    </div>
    <!-- line end -->

    <!-- page number -->
    <div class="mt-4 mb-2 text-black dark:text-white">{{ page }}</div>
    <!-- page number end -->

    <!-- hr -->
    <div class="h-[2px] w-full bg-gray-100 dark:bg-gray-700"></div>
    <!-- hr end -->
  </div>
</template>

<script setup>
const props = defineProps({
  lines: {
    type: Array,
    default: [],
  },
  page: {
    type: Number,
    default: "",
  },
  loadedPages: {
    type: Array,
    default: [],
  },
});
</script>
