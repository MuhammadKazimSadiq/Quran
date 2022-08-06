<template>
  <h1 class="text-center text-3xl dark:text-white">موضوعات</h1>

  <!-- search -->
  <div class="mt-8 flex justify-center">
    <div
      class="relative flex w-full items-center justify-between rounded-2xl border-2 border-gray-300/60 p-2 text-gray-600 dark:bg-gray-700 md:w-1/2"
    >
      <div class="flex flex-1 justify-start">
        <!-- search icon -->
        <SearchIcon
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

  <div class="mt-8 flex justify-center">
    <button
      type="button"
      class="inline-flex items-center justify-between gap-2 rounded-md border border-transparent bg-blue-100 px-4 py-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      @click="openEditModal(false)"
    >
      <PlusIcon class="w-4" />
      <span> موضوع جدید </span>
    </button>
  </div>

  <div class="mx-auto mt-8 w-full rounded-lg bg-white p-4 dark:bg-gray-800">
    <template v-if="filteredTopics.length">
      <div v-for="topic in filteredTopics">
        <div
          class="my-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors dark:bg-gray-900"
        >
          <div class="p-2 text-2xl text-black dark:text-white">
            <span>{{ topic.topic_name }}</span>
            <span class="mr-2 text-sm text-gray-700 dark:text-gray-300">
              ({{ topic?.verses?.length }} آیات)
            </span>
          </div>
          <div class="flex items-center gap-3">
            <div @click="openEditModal(topic)" class="cursor-pointer">
              <EditIcon
                class="h-6 w-6 rounded-full p-1 text-blue-700 hover:bg-gray-200 dark:text-blue-300 dark:hover:bg-gray-600"
              />
            </div>

            <div @click="openDeleteModal(topic)" class="cursor-pointer">
              <DeleteIcon
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

  <!-- edit modal -->
  <Modal :isOpen="editModal">
    <template v-slot:title>
      {{ editMode ? "ویرایش موضوع" : "موضوع جدید" }}
    </template>
    <template v-slot:content>
      <div
        class="mt-6 flex items-center justify-between gap-6 text-blue-800 dark:text-blue-200"
      >
        <input
          type="text"
          placeholder="موضوع"
          class="flex-1 rounded-2xl border-2 border-gray-300/60 p-2 text-gray-600 placeholder-gray-700 focus:border-gray-700/60 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-300"
          v-model="selectedTopic.topic_name"
        />
      </div>
    </template>
    <template v-slot:buttons>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-8 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        @click="editMode ? updateTopic() : createTopic()"
      >
        تایید
      </button>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-gray-300 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:text-gray-100 dark:hover:bg-gray-900"
        @click="closeEditModal"
      >
        خیر
      </button>
    </template>
  </Modal>
  <!-- delete modal -->
  <Modal :isOpen="deleteModal">
    <template v-slot:title>حذف موضوع</template>
    <template v-slot:content>
      <p
        class="dark:gray-200 mt-4 text-right text-lg text-gray-800 dark:text-gray-200"
      >
        آیا مایل هستید موضوع
        <span class="text-blue-700 dark:text-blue-300"
          >`{{ selectedTopic.topic_name }}`</span
        >
        را حذف کنید؟
      </p>
    </template>
    <template v-slot:buttons>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-8 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        @click="deleteTopic"
      >
        حذف
      </button>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-gray-300 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:text-gray-100 dark:hover:bg-gray-900"
        @click="closeDeleteModal"
      >
        خیر
      </button>
    </template>
  </Modal>
</template>

<script setup>
// vue
import { ref, computed } from "vue";
// components
import VerseList from "../components/verse/VerseList.vue";
import Modal from "../components/Modal.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import DeleteIcon from "../components/icons/DeleteIcon.vue";
import ChevronUpIcon from "../components/icons/ChevronUpIcon.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import PlusIcon from "../components/icons/PlusIcon.vue";

import { useStore } from "../store/useStore";
const store = useStore();

const searchString = ref("");

const filteredTopics = computed(() => {
  return store.topics.filter((topic) =>
    searchString.value.length
      ? topic.topic_name.includes(searchString.value)
      : store.topics
  );
});

const editModal = ref(false);
const deleteModal = ref(false);

const selectedTopic = ref({});

const editMode = ref(false);

const openEditModal = (topic) => {
  // set modal mode
  if (topic) {
    editMode.value = true;
    selectedTopic.value = Object.assign({}, topic);
  } else {
    editMode.value = false;
  }
  editModal.value = true;
};

const closeEditModal = () => {
  editModal.value = false;
  selectedTopic.value = {};
};

const openDeleteModal = (topic) => {
  selectedTopic.value = Object.assign({}, topic);
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
  editModal.value = false;
  selectedTopic.value = {};
};

const createTopic = async () => {
  await store.createTopic(selectedTopic.value);
  closeEditModal();
};

const updateTopic = async () => {
  await store.updateTopic(selectedTopic.value);
  closeEditModal();
};

const deleteTopic = async () => {
  await store.deleteTopic(selectedTopic.value);
  closeDeleteModal();
};
</script>
