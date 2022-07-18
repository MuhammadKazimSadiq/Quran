<template>
  <div class="box-border flex font-farsi">
    <!-- sidebar -->
    <Sidebar />

    <div class="flex-1">
      <!-- navigation -->
      <Nav />
      <!-- main view -->
      <main class="p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
  <CommandPalette />
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "./store/useStore";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";
import CommandPalette from "./components/CommandPalette.vue";

const store = useStore();
const { fetchChapters, fetchVerses } = store;

const route = useRoute();

onMounted(() => {
  fetchChapters();
  fetchVerses();
});
</script>

<style>
*::-webkit-scrollbar {
  direction: rtl;
  width: 8px;
  height: 5px;
  background: rgb(224, 224, 224);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgb(116, 116, 116);
}

*::-webkit-scrollbar-thumb {
  background-color: #adadad;
}
</style>
