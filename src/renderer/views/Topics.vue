<template>
  <h1 class="text-center text-3xl dark:text-white">موضوعات</h1>

  <div class="mx-auto mt-8 w-full rounded-2xl bg-white p-4 dark:bg-gray-800">
    <Disclosure v-slot="{ open }" v-for="topic in topics">
      <DisclosureButton
        class="my-2 flex w-full justify-between rounded-lg bg-gray-100 p-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 dark:bg-gray-900 dark:text-white"
      >
        <span class="text-xl">{{ topic.name }}</span>
        <ChevronUpIcon
          :class="open ? '' : 'rotate-180 transform'"
          class="h-5 w-5 text-gray-500"
        />
      </DisclosureButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel
          class="px-4 pt-4 pb-2 text-sm text-gray-900 dark:text-white"
        >
          بسم الله الرحمن الرحیم
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>

<script setup>
// components
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import ChevronUpIcon from "../components/icons/ChevronUpIcon.vue";

const topics = [
  { name: "عصمت", id: 1 },
  { name: "امامت", id: 2 },
  { name: "تجرد روح", id: 3 },
];
</script>
