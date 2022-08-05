<template>
  <h1 class="text-center text-3xl dark:text-white">موضوعات</h1>

  <div class="mx-auto mt-8 w-full rounded-2xl bg-white p-4 dark:bg-gray-800">
    <Disclosure
      v-slot="{ open }"
      v-for="topic in store.topics"
      :key="topic.topic_id"
    >
      <DisclosureButton
        class="my-2 flex w-full justify-between rounded-lg bg-gray-100 p-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 dark:bg-gray-900 dark:text-white"
      >
        <span class="text-xl">{{ topic.topic_name }}</span>
        <ChevronUpIcon
          :class="open ? '' : 'rotate-180 transform'"
          class="h-5 w-5 text-gray-500 dark:text-gray-100 dark:hover:text-gray-400"
        />
      </DisclosureButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
        <DisclosurePanel
          class="px-4 pt-4 pb-2 text-sm text-gray-900 dark:text-white"
        >
          <ul v-if="topic.verses.length">
            <li v-for="verse in topic.verses">
              <Verse
                :verse="verse"
                :icons="['goToVerse', 'copyToClipboard', 'bookmark']"
                :showTopics="false"
                :showVocabulary="false"
                :lazyLoad="[]"
              />
            </li>
          </ul>
          <template v-else>
            <div class="text-center text-xl text-black">
              آیه ای با این موضوع یافت نشد
            </div>
          </template>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>

<script setup>
// components
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import Verse from "../components/verse/Verse.vue";
import ChevronUpIcon from "../components/icons/ChevronUpIcon.vue";

import { useStore } from "../store/useStore";
const store = useStore();
</script>
