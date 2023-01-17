<template>
  <component
    :is="store?.settings?.theme === 'light' ? MoonIcon : SunIcon"
    class="w-6 cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-400"
    @click="store.changeTheme"
  ></component>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../store/store";

import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

const store = useStore();
</script>
