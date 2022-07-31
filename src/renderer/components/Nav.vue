<template>
  <nav
    class="sticky top-0 z-10 flex flex-col bg-gray-100 transition-transform duration-500 dark:bg-gray-800"
  >
    <div class="flex items-center justify-between p-4">
      <!-- app name -->
      <div class="text-2xl dark:text-white">قرآن</div>
      <!-- app name -->

      <!-- icons -->
      <div class="flex justify-center gap-4">
        <!-- toggle theme switch -->
        <ToggleThemeSwitch />
        <!-- toggle theme switch end -->

        <!-- settings icon -->
        <router-link to="/settings" class="rounded-md p-2">
          <SettingsIcon />
        </router-link>
        <!-- settings icon end -->
      </div>
      <!-- icons end -->
    </div>

    <!-- panel -->
    <div v-if="route.name === 'Read'">
      <!-- only render in Read route -->
      <div class="flex flex-col">
        <div class="flex justify-between px-6 py-2">
          <!-- chapter name -->
          <div class="text-xl font-bold dark:text-white">
            سوره {{ store.getChapter(route.params.id)?.name }}
          </div>
          <!-- chapter name end -->

          <!-- section & page number -->
          <div class="flex gap-6">
            <!-- page -->
            <div class="text-lg dark:text-white">صفحه {{ store.pageId }}</div>
            <!-- section -->
            <div class="text-lg text-gray-500 dark:text-gray-300">
              <!-- جزء {{ store.pageId }} -->
            </div>
          </div>
          <!-- page number end -->
        </div>
        <!-- progress indicator -->
        <ProgressIndicator />
        <!-- progress indicator end -->
      </div>
    </div>
    <!-- panel end -->
  </nav>
</template>

<script setup>
// router
import { useRoute } from "vue-router";
// store
import { useStore } from "../store/useStore";

// components
import ProgressIndicator from "../components/ProgressIndicator.vue";
import SettingsIcon from "../components/icons/SettingsIcon.vue";
import ToggleThemeSwitch from "../components/ToggleThemeSwitch.vue";

// route
const route = useRoute();

// store
const store = useStore();
</script>
