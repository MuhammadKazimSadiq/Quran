<template>
  <component
    :is="store.theme === 'light' ? MoonIcon : SunIcon"
    class="cursor-pointer"
    @click="store.changeTheme"
  ></component>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../store/useStore";
import SunIcon from "./icons/SunIcon.vue";
import MoonIcon from "./icons/MoonIcon.vue";

const store = useStore();
</script>
