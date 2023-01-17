<template>
  <h1 class="text-center text-3xl dark:text-white">موضوعات</h1>

  <!-- search -->
  <div class="mt-8 flex justify-center">
    <div
      class="relative flex w-full items-center justify-between rounded-2xl border-2 border-gray-300/60 p-2 text-gray-600 dark:bg-gray-700 md:w-1/2"
    >
      <div class="flex flex-1 justify-start">
        <!-- search icon -->
        <MagnifyingGlassIcon
          class="mr-2 w-5 text-gray-400 dark:text-gray-300 dark:hover:text-gray-400"
        />
        <!-- search icon end -->

        <!-- input -->
        <input
          class="flex-1 border-0 text-xl focus:border-0 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          type="text"
          v-model="searchString"
          placeholder="جستجو"
        />
        <!-- input end -->
      </div>
    </div>
  </div>
  <!-- search end -->

  <!-- add button -->
  <div class="mt-8 flex justify-center">
    <button
      type="button"
      class="inline-flex items-center justify-between gap-2 rounded-md border border-transparent bg-blue-100 px-4 py-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      @click="openModal('editModal', false)"
    >
      <PlusIcon class="w-4" />
      <span> موضوع جدید </span>
    </button>
  </div>
  <!-- add button end -->

  <!-- topics list -->
  <div class="mx-auto mt-8 w-full rounded-lg bg-white p-4 dark:bg-gray-800">
    <template v-if="filteredTopics.length">
      <div v-for="topic in filteredTopics">
        <div
          class="my-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors dark:bg-gray-900"
        >
          <div class="p-2 text-2xl text-black dark:text-white">
            <span>{{ topic.topic_name }}</span>
            <span class="mr-2 text-sm text-gray-700 dark:text-gray-300">
              ({{ topic?.versesCount }} آیات)
            </span>
          </div>
          <div class="flex items-center gap-3">
            <div @click="openModal('editModal', topic)" class="cursor-pointer">
              <PencilIcon
                class="h-6 w-6 rounded-full p-1 text-blue-700 hover:bg-gray-200 dark:text-blue-300 dark:hover:bg-gray-600"
              />
            </div>

            <div
              @click="openModal('deleteModal', topic)"
              class="cursor-pointer"
            >
              <TrashIcon
                class="h-6 w-6 rounded-full p-1 text-red-700 hover:bg-gray-200 dark:text-red-300 dark:hover:bg-gray-600"
              />
            </div>
            <router-link :to="`/topics/${topic.topic_id}`">
              <ChevronUpIcon
                class="h-8 w-8 -rotate-90 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
              />
            </router-link>
          </div>
        </div>
      </div>
    </template>
    <div v-else>
      <div class="text-center text-xl text-gray-600 dark:text-gray-400">
        موضوعی یافت نشد!
      </div>
    </div>
  </div>
  <!-- topics list end -->

  <!-- edit modal -->
  <EditTopicModal
    :show="modals.editModal"
    :editMode="editMode"
    :selectedTopic="selectedTopic"
    @close="closeModal('editModal')"
  ></EditTopicModal>
  <!-- edit modal end -->

  <!-- delete modal -->
  <DeleteTopicModal
    :show="modals.deleteModal"
    :selectedTopic="selectedTopic"
    @close="closeModal('deleteModal')"
  ></DeleteTopicModal>
  <!-- delete modal end -->
</template>

<script setup>
// vue
import { ref, computed, reactive } from "vue";

// components
import VerseList from "../components/verse/VerseList.vue";
import EditTopicModal from "../components/EditTopicModal.vue";
import DeleteTopicModal from "../components/DeleteTopicModal.vue";

import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

// composables
import { useGetChildren } from "../composables/getChildren";
import { useGetTopicVersesCount } from "../composables/getTopicVersesCount";

import { useStore } from "../store/store";
const store = useStore();

const searchString = ref("");

const filteredTopics = computed(() => {
  return searchString.value.length
    ? nestedTopics.value.filter((topic) =>
        topic.topic_name.includes(searchString.value.trim())
      )
    : nestedTopics.value;
});

const nestedTopics = computed(() => {
  return store.topics
    .filter((topic) => !topic.parent_id)
    .map((topic) => {
      return {
        ...topic,
        parents: topic.topic_name,
        children: useGetChildren(store.topics, topic),
        versesCount: useGetTopicVersesCount(store.topics, topic),
      };
    });
});

// modals
const modals = reactive({
  editModal: false,
  deleteModal: false,
});
const editMode = ref(false);

const selectedTopic = ref({});

const openModal = (modal, topic) => {
  // set modal mode
  if (topic) {
    editMode.value = true;
    selectedTopic.value = Object.assign({}, topic);
  } else {
    editMode.value = false;
  }
  modals[modal] = true;
};

const closeModal = (modal) => {
  modals[modal] = false;
  selectedTopic.value = {};
};
</script>
