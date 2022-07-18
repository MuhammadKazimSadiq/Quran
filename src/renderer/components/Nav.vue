<template>
  <nav class="bg-gray-100 top-0 sticky z-10 flex flex-col">
    <div class="p-4 flex justify-between items-center">
      <div class="text-2xl">قرآن</div>
      <!-- icons -->
      <div class="flex justify-center gap-6">
        <!-- light/ dark mode toggle icon -->
        <MoonIcon/>
        <!-- settings icon -->
        <router-link to="/settings" class="rounded-md p-2">
          <SettingsIcon/>
        </router-link>
      </div>
    </div>

    <ProgressIndicator />
  </nav>
</template>

<script setup>
import ProgressIndicator from '../components/ProgressIndicator.vue'
import SettingsIcon from '../components/SettingsIcon.vue'
import SunIcon from '../components/SunIcon.vue'
import MoonIcon from '../components/MoonIcon.vue'
</script>