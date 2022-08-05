<template>
  <h1 class="text-center text-3xl dark:text-white">موضوعات</h1>

  <div class="mx-auto mt-8 w-full rounded-lg bg-white p-4 dark:bg-gray-800">
    <div v-for="topic in store.topics">
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
  </div>

  <!-- edit modal -->
  <Modal :isOpen="editModal">
    <template v-slot:title> ویرایش موضوع </template>
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
        @click="updateTopic"
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
import { ref } from "vue";
// components
import VerseList from "../components/verse/VerseList.vue";
import Modal from "../components/Modal.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import DeleteIcon from "../components/icons/DeleteIcon.vue";
import ChevronUpIcon from "../components/icons/ChevronUpIcon.vue";

import { useStore } from "../store/useStore";
const store = useStore();

const editModal = ref(false);
const deleteModal = ref(false);

const selectedTopic = ref({});

const openEditModal = (topic) => {
  selectedTopic.value = Object.assign({}, topic);
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
  selectedTopic.value = {};
};

const updateTopic = () => {
  //
};
const deleteTopic = () => {
  //
};
</script>
