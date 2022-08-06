<template>
  <div>
    <div>
      <router-link to="/topics">
        <ArrowLeftIcon
          class="h-8 w-8 rotate-180 cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600"
        />
      </router-link>
    </div>
    <h1 class="text-center text-3xl dark:text-white">
      {{ store.getTopic(params.id)?.topic_name }}
    </h1>
  </div>

  <section class="mt-4">
    <VerseList
      v-if="store.getTopic(params.id)?.verses?.length"
      :verses="store.getTopic(params.id)?.verses"
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
</template>

<script setup>
// router
import { useRoute } from "vue-router";

// pinia
import { storeToRefs } from "pinia";

// store
import { useStore } from "../store/useStore";

// components
import VerseList from "../components/verse/VerseList.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";

// store
const store = useStore();

// route
const route = useRoute();
const { params } = storeToRefs(route);
</script>
