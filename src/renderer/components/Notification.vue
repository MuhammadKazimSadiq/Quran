<template>
  <TransitionRoot
    :show="store.notification.show"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div
      class="pointer-events-none fixed bottom-0 right-10 left-0 z-50 flex items-end justify-center px-4 py-6 sm:items-start sm:justify-start sm:p-6"
    >
      <div
        class="pointer-events-auto w-full max-w-sm rounded-lg shadow-lg"
        :class="[
          { 'bg-green-200 dark:bg-green-800': isType('success') },
          { 'bg-red-200 dark:bg-red-800': isType('error') },
          { 'bg-yellow-200 dark:bg-yellow-800': isType('warning') },
          { 'bg-blue-200 dark:bg-blue-800': isType('info') },
        ]"
      >
        <div class="shadow-xs overflow-hidden rounded-lg">
          <div class="p-4">
            <div class="flex items-start">
              <div class="w-0 flex-1 pt-0.5">
                <p
                  class="font-farsi text-lg font-medium leading-5 text-gray-900 dark:text-white"
                >
                  {{ store.notification.message }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  @click="store.notification.show = false"
                  class="inline-flex text-gray-400 transition duration-150 ease-in-out focus:text-gray-500 focus:outline-none"
                >
                  <XMarkIcon
                    class="w-6 cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-300/40 dark:text-gray-100 dark:hover:bg-gray-100/20"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot } from "@headlessui/vue";
import { useStore } from "../store/store";

import { XMarkIcon } from "@heroicons/vue/24/outline";

const store = useStore();

const isType = (type) => {
  return store.notification.type === type;
};
</script>
