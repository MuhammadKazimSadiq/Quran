<template>
  <Combobox v-model="selectedTopics" @update:modelValue="onUpdate()" multiple>
    <div class="relative mt-1">
      <!-- input wrapper -->
      <div
        class="relative flex cursor-default items-center overflow-hidden border-b border-gray-100 bg-inherit text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 dark:border-gray-800 sm:text-sm"
      >
        <!-- plus icon button -->
        <div class="mx-2">
          <ComboboxButton class="flex items-center">
            <PlusCircleIcon
              class="w-5 text-gray-700/70 dark:text-gray-200/70"
            />
          </ComboboxButton>
        </div>
        <!-- plus icon button end -->

        <!-- selected topics chips -->
        <div class="my-2">
          <div class="flex flex-wrap items-center gap-2">
            <div
              v-for="(topic, i) in selectedTopics"
              class="flex min-w-max gap-2 rounded-lg border border-gray-300 bg-inherit p-2 text-xs dark:border-gray-700 dark:text-gray-100"
            >
              <span>{{ topic.topic_name }}</span>
              <ClearIcon
                @click.stop="selectedTopics.splice(i, 1) && onUpdate()"
                class="w-3 cursor-pointer text-gray-700/60 dark:text-gray-300/60"
              />
            </div>
          </div>
        </div>
        <!-- selected topics chips end -->

        <!-- input -->
        <ComboboxInput
          class="flex-1 border-none bg-inherit py-2 pl-10 text-sm leading-5 text-gray-900 placeholder:text-gray-500 focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-400"
          :placeholder="selectedTopics.length ? '' : 'موضوعات'"
          @keydown="onKeyPress($event)"
          @change="query = $event.target.value"
        />
        <!-- input -->

        <!-- save & cancel icons -->
        <div v-if="showSaveIcon" class="flex gap-2">
          <SaveIcon
            @click="updateTopics()"
            class="h-4 w-4 cursor-pointer text-gray-600/60 dark:text-gray-200/70"
          />
          <ClearIcon
            @click="cancel()"
            class="h-4 w-4 cursor-pointer text-gray-600/60 dark:text-gray-200/70"
          />
        </div>
        <!-- save & cancel icons end -->
      </div>
      <!-- input wrapper end -->

      <!-- options -->
      <ComboboxOptions
        class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm"
      >
        <!-- no results found message -->
        <div
          v-if="filteredTopics.length === 0 && query !== ''"
          class="relative cursor-default select-none py-2 px-4 text-center text-gray-700 dark:text-gray-300"
        >
          موردی یافت نشد!
        </div>
        <!-- no results found message end -->

        <!-- add new topic -->
        <ComboboxOption v-if="queryTopic" :value="queryTopic" as="template">
          <div
            class="relative cursor-pointer select-none bg-gray-100 py-2 pl-10 dark:bg-gray-900 dark:text-gray-100"
          >
            <div class="select-none pr-4">
              ایجاد موضوع جدید:
              <span class="mr-1 font-bold text-green-700">{{ query }}</span>
            </div>
          </div>
        </ComboboxOption>
        <!-- add new topic -->

        <ComboboxOption
          v-for="topic in filteredTopics"
          as="template"
          :key="topic.topic_id"
          :value="topic"
          v-slot="{ selected, active }"
        >
          <li
            class="relative cursor-pointer select-none py-2 pl-10 pr-4"
            :class="{
              'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100':
                active,
              'text-gray-900 dark:text-gray-100': !active,
            }"
          >
            <!-- topic name -->
            <span class="block">
              {{ topic.topic_name }}
            </span>
            <span class="truncate text-xs text-gray-700 dark:text-gray-300">
              ({{ topic.parents }})
            </span>
            <!-- topic name end -->

            <!-- checkbox -->
            <span
              v-if="selected"
              class="absolute inset-y-0 left-0 flex items-center pl-3"
              :class="{
                'text-gray-900 dark:text-white': active,
                'text-gray-600 dark:text-gray-400': !active,
              }"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
            <!-- checkbox end -->
          </li>
        </ComboboxOption>
      </ComboboxOptions>
      <!-- options end -->
    </div>
  </Combobox>
</template>

<script setup>
// vue
import { ref, computed, defineProps } from "vue";

// components
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import ClearIcon from "../icons/ClearIcon.vue";
import CheckIcon from "../icons/CheckIcon.vue";
import PlusCircleIcon from "../icons/PlusCircleIcon.vue";
import SaveIcon from "../icons/SaveIcon.vue";

// store
import { useStore } from "../../store/store";

// composables
import { useGetParentList } from "../../composables/getParentList";

// store
const store = useStore();

const props = defineProps({
  verseId: {
    type: Number,
    required: true,
    default: 0,
  },
  topics: {
    type: Array,
    required: true,
    default: [],
  },
});

let query = ref("");
const queryTopic = computed(() => {
  return query.value === ""
    ? null
    : { topic_id: null, topic_name: query.value };
});

const preSelectedTopics = () =>
  store.topics.filter((topic) =>
    props?.topics?.find((pt) => pt?.topic_id === topic?.topic_id)
  );

let selectedTopics = ref(preSelectedTopics());

const mappedTopics = computed(() => {
  return store.topics.map((topic) => {
    return {
      ...topic,
      parents: useGetParentList(store.topics, topic, {
        primaryId: "topic_id",
        nameField: "topic_name",
      }),
    };
  });
});

const filteredTopics = computed(() =>
  query.value === ""
    ? mappedTopics.value
    : mappedTopics.value.filter((topic) =>
        topic.topic_name.includes(query.value.trim())
      )
);

const onKeyPress = (e) => {
  // if key not backspace
  if (e.key !== "Backspace") return;
  // if query string is not empty
  if (query.value.length) return;
  // if no options selected
  if (!selectedTopics.value.length) return;

  // remove last option
  selectedTopics.value.pop() && onUpdate();
};

const showSaveIcon = ref(false);

const onUpdate = () => {
  query.value = "";
  showSaveIcon.value = true;
};

const cancel = () => {
  showSaveIcon.value = false;
  selectedTopics.value = [...props.topics];
};

const updateTopics = async () => {
  await store.updateVerseTopics({
    verseId: props.verseId,
    oldTopics: props.topics,
    newTopics: selectedTopics.value,
  });
  showSaveIcon.value = false;
};
</script>
