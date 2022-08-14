<template>
  <Modal :isOpen="show">
    <template v-slot:title>
      {{ editMode ? "ویرایش موضوع" : "موضوع جدید" }}
    </template>
    <template v-slot:content>
      <div class="mt-6 flex flex-col gap-8">
        <input
          type="text"
          placeholder="موضوع"
          class="rounded-2xl border-2 border-gray-300/60 p-2 text-gray-600 placeholder-gray-700 focus:border-gray-700/60 focus:outline-0 focus:ring-0 dark:border-gray-500/60 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-300/60"
          v-model="topic.topic_name"
        />

        <select
          v-model="parentTopic"
          class="rounded-2xl border-2 border-gray-300/60 text-gray-600 focus:border-gray-700/60 focus:outline-0 focus:ring-0 dark:border-gray-500/60 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-gray-300/60"
        >
          <option :value="0">انتخاب موضوع كلی</option>
          <option v-for="topic in topics" :value="topic.topic_id">
            {{ topic.topic_name }}
          </option>
        </select>
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
        @click="$emit('close')"
      >
        خیر
      </button>
    </template>
  </Modal>
</template>

<script setup>
// vue
import { ref, toRef, computed } from "vue";

// store
import { useStore } from "../store/store";

// components
import Modal from "./Modal.vue";

// store
const store = useStore();

// props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  selectedTopic: {
    type: Object,
    default: {},
  },
  parentTopic: {
    type: Number,
    default: 0,
  },
});

// emits
const emit = defineEmits(["close"]);

const topic = toRef(props, "selectedTopic");

// parent topic
const topics = computed(() => {
  return store.topics;
});
// const parent = toRef(props, "parentTopic");

const createTopic = async () => {
  const newTopic = {
    name: topic.value.topic_name,
    parent_id: props.parentTopic,
  };
  await store.createTopic(newTopic);
  emit("close");
};

const updateTopic = async () => {
  await store.updateTopic(topic.value);
  emit("close");
};
</script>
