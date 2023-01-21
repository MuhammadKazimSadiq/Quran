<template>
  <nav
    class="sticky top-0 z-10 flex flex-col bg-gray-100 transition-transform duration-500 dark:bg-gray-800"
  >
    <div class="flex items-center justify-between p-4">
      <!-- app name -->
      <div class="text-2xl dark:text-white">قرآن</div>
      <!-- app name -->

      <!-- icons -->
      <div class="flex justify-center gap-6 p-2">
        <!-- fullscreen icon -->
        <ArrowsPointingOutIcon
          class="w-6 text-gray-600 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-400"
        />
        <!-- fullscreen icon end -->

        <!-- toggle theme switch -->
        <ToggleThemeSwitch />
        <!-- toggle theme switch end -->

        <!-- settings icon -->
        <router-link
          to="/settings"
          class="rounded-md focus:outline-gray-300 focus:ring-0"
        >
          <Cog8ToothIcon
            class="w-6 text-gray-600 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-400"
          />
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
              جزء {{ store.sectionId }}
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
import { useRoute, useRouter } from "vue-router";
// store
import { useStore } from "../store/store";

// components
import ProgressIndicator from "../components/ProgressIndicator.vue";
import ToggleThemeSwitch from "../components/ToggleThemeSwitch.vue";
import {
  Cog8ToothIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/vue/24/outline";

// route
const route = useRoute();

// router
const router = useRouter();

// store
const store = useStore();
</script>
