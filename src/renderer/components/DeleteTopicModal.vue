<template>
  <Modal :isOpen="show">
    <template v-slot:title>حذف موضوع</template>
    <template v-slot:content>
      <p
        class="dark:gray-200 mt-4 text-right text-lg text-gray-800 dark:text-gray-200"
      >
        آیا مایل هستید موضوع
        <span class="text-blue-700 dark:text-blue-300"
          >`{{ topic.topic_name }}`</span
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
        @click="$emit('close')"
      >
        خیر
      </button>
    </template>
  </Modal>
</template>

<script setup>
// vue
import { ref, toRef } from "vue";

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
  selectedTopic: {
    type: Object,
    default: {},
  },
});

// emits
const emit = defineEmits(["close"]);

const topic = toRef(props, "selectedTopic");

const deleteTopic = async () => {
  await store.deleteTopic(topic.value);
  emit("close");
};
</script>
