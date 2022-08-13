<template>
  <div>
    <div>
      <a @click="router.go(-1)">
        <ArrowRightIcon
          class="h-8 w-8 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
        />
      </a>
    </div>
    <h1 class="text-center text-3xl dark:text-white">
      {{ currentTopic?.topic_name }}
    </h1>
  </div>

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

  <!-- add button -->
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
  <!-- add button end -->

  <!-- child topics -->
  <template v-if="topics.length">
    <section class="mt-8 rounded-lg bg-white p-4 dark:bg-gray-800">
      <div
        v-for="topic in topics"
        class="my-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors dark:bg-gray-900"
      >
        <div class="flex gap-2 p-2">
          <div class="flex flex-col gap-1">
            <div class="text-2xl text-black dark:text-white">
              {{ topic.topic_name }}
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              {{ topic?.parents }}
            </div>
          </div>
          <div class="mr-2 self-end text-sm text-gray-700 dark:text-gray-300">
            ({{ countVerses(topic) }} آیات)
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div @click="openEditModal(topic)" class="cursor-pointer">
            <PencilIcon
              class="h-6 w-6 rounded-full p-1 text-blue-700 hover:bg-gray-200 dark:text-blue-300 dark:hover:bg-gray-600"
            />
          </div>

          <div @click="openDeleteModal(topic)" class="cursor-pointer">
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
    </section>
  </template>
  <!-- child topics end -->

  <!-- verses -->
  <section class="mt-4">
    <VerseList
      v-if="currentTopic?.verses?.length"
      :verses="currentTopic?.verses"
      :lazyLoad="true"
      :icons="['goToVerse', 'copyToClipboard', 'bookmark', 'removeTopic']"
      :showTopics="false"
      :showVocabulary="false"
      :showBismillah="false"
      :showSection="false"
      :showPage="false"
      :canEditVocabulary="false"
    />
    <div v-else>
      <p class="p-8 text-center text-2xl dark:text-white">
        هیچ آیه ای زیر این موضوع ثبت نشده است.
      </p>
    </div>
  </section>
  <!-- verses end -->

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
// router
import { useRoute, useRouter } from "vue-router";

// pinia
import { storeToRefs } from "pinia";

// store
import { useStore } from "../store/store";

// components
import VerseList from "../components/verse/VerseList.vue";
import Modal from "../components/Modal.vue";
import {
  SearchIcon,
  PlusIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
  ArrowRightIcon,
} from "@heroicons/vue/outline";

// composables
import { useGetParentTopics } from "../composables/getParentTopics";
import { useGetChildren } from "../composables/getChildren";
import { useGetTopicVersesCount } from "../composables/getTopicVersesCount";

// store
const store = useStore();

// router
const router = useRouter();

// route
const route = useRoute();
const { params } = storeToRefs(route);

const currentTopic = computed(() => store.getTopic(params.value.id));

const searchString = ref("");

const topics = computed(() => {
  return searchString.value.length
    ? useGetChildren(store.topics, currentTopic.value).filter((topic) =>
        topic.topic_name.includes(searchString.value.trim())
      )
    : useGetChildren(store.topics, currentTopic.value);
});

const countVerses = (topic) => {
  return useGetTopicVersesCount(store.topics, topic);
};

// modals
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
