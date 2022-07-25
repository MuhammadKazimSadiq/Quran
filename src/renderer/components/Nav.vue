<template>
  <nav class="sticky top-0 z-10 flex flex-col bg-gray-100 dark:bg-gray-800">
    <div class="flex items-center justify-between p-4">
      <div class="text-2xl dark:text-white">قرآن</div>
      <!-- icons -->
      <div class="flex justify-center gap-4">
        <!-- light/ dark mode toggle icon -->
        <ToggleThemeSwitch />
        <!-- settings icon -->
        <router-link to="/settings" class="rounded-md p-2">
          <SettingsIcon />
        </router-link>
      </div>
    </div>

    <ProgressIndicator />
  </nav>
</template>

<script setup>
import ProgressIndicator from "../components/ProgressIndicator.vue";
import SettingsIcon from "../components/icons/SettingsIcon.vue";
import ToggleThemeSwitch from "../components/ToggleThemeSwitch.vue";
</script>
