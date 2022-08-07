<template>
  <div>
    <div>
      <a @click="router.go(-1)">
        <ArrowLeftIcon
          class="h-8 w-8 rotate-180 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
        />
      </a>
    </div>
    <h1 class="text-center text-3xl dark:text-white">
      {{ currentTopic?.topic_name }}
    </h1>
  </div>

  <!-- child topics -->
  <template v-if="getChildren(store.topics, currentTopic).length">
    <section class="mt-8 rounded-lg bg-white p-4 dark:bg-gray-800">
      <div
        v-for="topic in getChildren(store.topics, currentTopic)"
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
            ({{ getVersesCount(store.topics, topic) }} آیات)
          </div>
        </div>
        <div class="flex items-center gap-3">
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
      :canEditVocabulary="false"
    />
    <div v-else>
      <p class="p-8 text-center text-2xl dark:text-white">
        هیچ آیه ای زیر این موضوع ثبت نشده است.
      </p>
    </div>
  </section>
  <!-- verses end -->
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
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";
import ChevronUpIcon from "../components/icons/ChevronUpIcon.vue";

// composables
import { useGetParentList } from "../composables/getParentList";

// store
const store = useStore();

// router
const router = useRouter();

// route
const route = useRoute();
const { params } = storeToRefs(route);

const currentTopic = computed(() => store.getTopic(params.value.id));

const getVersesCount = (data, parent) => {
  const children = data.filter((topic) => topic.parent_id === parent.topic_id);
  if (!children.length) {
    return parent.verses.length;
  }
  return children.reduce((acc, child) => {
    return acc + getVersesCount(data, child);
  }, parent.verses.length);
};

const getChildren = (data, parent) => {
  const children = data.filter((topic) => topic.parent_id === parent.topic_id);
  if (!children.length) {
    return [];
  }
  return children.map((child) => {
    return {
      ...child,
      parents: useGetParentList(store.topics, child, {
        primaryId: "topic_id",
        nameField: "topic_name",
      }),
      children: getChildren(data, child),
    };
  });
};
</script>
