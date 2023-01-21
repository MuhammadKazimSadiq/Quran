<template>
  <!-- Root -->
  <div id="root" :class="store?.settings?.theme">
    <!-- Command Palette -->
    <CommandPalette />
    <!-- Command Palette end -->

    <div class="box-border flex bg-white font-farsi dark:bg-gray-900">
      <!-- sidebar -->
      <Sidebar />
      <!-- sidebar end -->

      <div class="flex-1 bg-white dark:bg-gray-900">
        <!-- navigation -->
        <Nav />
        <!-- navigation end -->

        <!-- main view -->
        <main class="mb-20 overflow-x-auto bg-white p-6 dark:bg-gray-900">
          <router-view></router-view>
        </main>
        <!-- main view end -->
      </div>
    </div>

    <!-- Notification -->
    <Notification />
    <!-- Notification End -->

    <!-- Audio Player -->
    <AudioPlayer />
    <!-- Audio Player -->
  </div>
  <!-- Root end -->
</template>

<script setup>
// ipcRenderer
import { ipcRenderer } from "./electron";
// vue
import { onMounted } from "vue";
// router
import { useRouter, useRoute } from "vue-router";
// store
import { useStore } from "./store/store";

// composables
import { useFetch } from "./composables/fetch";

// config
import { versesConfig, topicsConfig } from "./config/groupConfig";

// components
import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";
import CommandPalette from "./components/CommandPalette.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import Notification from "./components/Notification.vue";

// subscribe to main event events
ipcRenderer
  .subscribe("event")
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

// store
const store = useStore();

// router
const router = useRouter();

// route
const route = useRoute();

// onMount --> fetch data
onMounted(async () => {
  await useFetch("setting", { toObject: true });
  await useFetch("chapter");
  await useFetch("verse", { group: true, groupConfig: versesConfig });
  await useFetch("translation");
  await useFetch("topic", { group: true, groupConfig: topicsConfig });
  await useFetch("vocabulary", { storeName: "vocabulary" });
  await useFetch("reciter");
});

// keyboard shortcuts
window.addEventListener("keydown", (e) => {
  if ((e.key === "k" || e.key === "ن") && (e.metaKey || e.ctrlKey)) {
    store.commandPalette = !store.commandPalette;
  }

  if ((e.key === "," || e.key === "و") && (e.metaKey || e.ctrlKey)) {
    if (route.name === "Settings") router.go(-1);
    else router.push("/settings");
  }

  if ((e.key === "t" || e.key === "ف") && (e.metaKey || e.ctrlKey)) {
    store.changeTheme();
  }
});
</script>

<style>
/* verse number bracket */
.verse-number::before {
  content: "\0006DD";
  font-size: 26px;
  position: absolute;
}

/* scrollbar */
*::-webkit-scrollbar {
  direction: rtl;
  width: 8px;
  height: 5px;
  background: rgb(224, 224, 224);
}

*::-webkit-scrollbar-thumb {
  background-color: #adadad;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgb(116, 116, 116);
}

*.dark::-webkit-scrollbar {
  background: rgb(17 24 39);
}

.dark::-webkit-scrollbar-thumb {
  background-color: rgb(75 85 99);
}

.dark::-webkit-scrollbar-thumb:hover {
  background-color: rgb(107 114 128);
}
</style>
