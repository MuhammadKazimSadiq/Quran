<template>
  <div>
    <div class="flex items-center justify-start gap-8">
      <a @click="router.go(-1)">
        <ArrowRightIcon
          class="h-8 w-8 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
        />
      </a>
      <!-- breadcrumbs -->
      <div class="flex gap-2 text-gray-700 dark:text-gray-300">
        <div v-for="(link, i) in breadcrumbs">
          <span
            @click="router.push(`/topics/${link.id}`)"
            class="cursor-pointer text-yellow-800 dark:text-yellow-200"
          >
            {{ link.name }}
          </span>
          <span v-if="i < breadcrumbs.length - 1" class="mr-2">/</span>
        </div>
      </div>
      <!-- breadcrumbs end -->
    </div>
    <h1 class="mt-6 text-center text-3xl dark:text-white">
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
      @click="openModal('editModal', false)"
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
          <div @click="openModal('editModal', topic)" class="cursor-pointer">
            <PencilIcon
              class="h-6 w-6 rounded-full p-1 text-blue-700 hover:bg-gray-200 dark:text-blue-300 dark:hover:bg-gray-600"
            />
          </div>

          <div @click="openModal('deleteModal', topic)" class="cursor-pointer">
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
  <section v-else class="mt-8 rounded-lg bg-white p-4 dark:bg-gray-800">
    <div
      class="my-4 flex items-center justify-center rounded-lg bg-gray-100 p-4 text-lg text-black transition-colors dark:bg-gray-900 dark:text-white"
    >
      هیچ موضوعی یافت نشد!
    </div>
  </section>
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
  <EditTopicModal
    :show="modals.editModal"
    :editMode="editMode"
    :selectedTopic="selectedTopic"
    :parentTopic="currentTopic?.topic_id"
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
// router
import { useRoute, useRouter } from "vue-router";

// pinia
import { storeToRefs } from "pinia";

// store
import { useStore } from "../store/store";

// components
import VerseList from "../components/verse/VerseList.vue";
import EditTopicModal from "../components/EditTopicModal.vue";
import DeleteTopicModal from "../components/DeleteTopicModal.vue";
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

// breadcrumbs
const breadcrumbs = computed(() => {
  return useGetParentTopics(store.topics, currentTopic.value).reverse();
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
