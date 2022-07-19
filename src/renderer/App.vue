<template>
  <div id="root" :class="store.theme">
    <CommandPalette />
    <div class="box-border flex font-farsi">
      <!-- sidebar -->
      <Sidebar />

      <div class="flex-1">
        <!-- navigation -->
        <Nav />
        <!-- main view -->
        <main class="bg-white p-6 dark:bg-gray-900">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "./store/useStore";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";
import CommandPalette from "./components/CommandPalette.vue";

const store = useStore();
const { fetchChapters, fetchVerses } = store;

const route = useRoute();
const router = useRouter();

onMounted(() => {
  fetchChapters();
  fetchVerses();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "k" && (event.metaKey || event.ctrlKey)) {
    store.commandPalette = !store.commandPalette;
  }
  if (e.key === "," && (event.metaKey || event.ctrlKey)) {
    router.push("/settings");
  }

  if (e.key === "t" && (event.metaKey || event.ctrlKey)) {
    store.changeTheme();
  }
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
