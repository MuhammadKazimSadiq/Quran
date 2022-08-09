<template>
  <div
    class="fixed bottom-0 mr-[46px] flex h-16 flex-row items-center justify-between bg-gray-50 py-4 px-6 dark:bg-gray-800"
    style="width: calc(100% - 46px)"
  >
    <div class="text-black dark:text-white">04:05</div>
    <div class="flex flex-row gap-8">
      <div>
        <FastForwardIcon
          class="w-8 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
        />
      </div>
      <div>
        <PlayIcon
          v-if="true"
          class="w-8 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
        />
        <PauseIcon
          v-else
          class="w-8 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
        />
      </div>
      <div>
        <RewindIcon
          class="w-8 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
        />
      </div>
    </div>
    <div class="text-black dark:text-white">00:04</div>
  </div>
</template>

<script setup>
import {
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  RewindIcon,
} from "@heroicons/vue/outline";
</script>
