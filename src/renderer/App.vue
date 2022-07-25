<template>
  <div id="root" :class="store.theme">
    <!-- Command Palette -->
    <CommandPalette />
    <div class="box-border flex bg-white font-farsi dark:bg-gray-900">
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
    <!-- Notification -->
    <Notification />
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
import Notification from "./components/Notification.vue";

const store = useStore();
const { fetchChapters, fetchVerses } = store;

const route = useRoute();
const router = useRouter();

onMounted(() => {
  fetchChapters();
  fetchVerses();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
    store.commandPalette = !store.commandPalette;
  }
  if (e.key === "," && (e.metaKey || e.ctrlKey)) {
    router.push("/settings");
  }

  if (e.key === "t" && (e.metaKey || e.ctrlKey)) {
    store.changeTheme();
  }
});
</script>

<style>
/* scrollbar */
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
