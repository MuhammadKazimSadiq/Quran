<template>
  <h1 class="text-center text-3xl dark:text-white">معانی کلمات</h1>

  <div class="my-8 mx-2 rounded-lg p-2 dark:bg-gray-800">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th
            class="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider text-gray-500 dark:text-white"
          >
            کلمه
          </th>
          <th
            class="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider text-gray-500 dark:text-white"
          >
            معنا
          </th>
          <th
            class="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider text-gray-500 dark:text-white"
          >
            آیه
          </th>

          <th class="relative px-6 py-3"></th>
        </tr>
      </thead>
      <tbody
        class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
      >
        <template v-if="store.vocabulary.length">
          <tr v-for="word in store.vocabulary">
            <td
              class="whitespace-nowrap px-6 py-4 text-lg text-black dark:text-white"
            >
              {{ word.word }}
            </td>
            <td
              class="whitespace-nowrap px-6 py-4 text-lg text-black dark:text-white"
            >
              {{ word.meaning }}
            </td>
            <td
              class="whitespace-nowrap px-6 py-4 text-lg text-black dark:text-white"
            >
              <span>{{ word.text_original }} </span>
              <span class="mr-2 text-xs text-gray-700 dark:text-gray-300"
                >[{{ word.chapter_name }} - {{ word.verse_id }}]</span
              >
            </td>

            <td
              class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
            >
              <div class="flex justify-center gap-4">
                <div @click="openEditModal(word)" class="cursor-pointer">
                  <EditIcon class="w-4 text-blue-700 dark:text-blue-300" />
                </div>

                <div @click="openDeleteModal(word)" class="cursor-pointer">
                  <DeleteIcon class="w-4 text-red-700 dark:text-red-300" />
                </div>
              </div>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td
            colspan="4"
            class="py-4 text-center text-xl text-black dark:text-white"
          >
            کلمه ای هنوز ثبت نشده است!
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- edit modal -->
  <Modal :isOpen="editModal">
    <template v-slot:title> ویرایش کلمه/ معنا </template>
    <template v-slot:content>
      <div
        class="mt-6 flex items-center justify-between gap-6 text-blue-800 dark:text-blue-200"
      >
        <p>{{ selectedWord.word }}:</p>
        <input
          type="text"
          placeholder="معنا"
          class="flex-1 rounded-2xl border-2 border-gray-300/60 p-2 text-gray-600 placeholder-gray-700 focus:border-gray-700/60 focus:outline-0 focus:ring-0 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-300"
          v-model="selectedWord.meaning"
        />
      </div>
    </template>
    <template v-slot:buttons>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-8 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        @click="updateWord"
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
    <template v-slot:title>حذف کلمه/ معنا</template>
    <template v-slot:content>
      <p
        class="dark:gray-200 mt-4 text-right text-lg text-gray-800 dark:text-gray-200"
      >
        آیا مایل هستید این کلمه و معنا را حذف کنید؟
      </p>
    </template>
    <template v-slot:buttons>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-8 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        @click="deleteWord"
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
// store
import { useStore } from "../store/useStore";

// components
import Modal from "../components/Modal.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import DeleteIcon from "../components/icons/DeleteIcon.vue";

// store
const store = useStore();

const editModal = ref(false);
const deleteModal = ref(false);

const selectedWord = ref({});

const openEditModal = (word) => {
  selectedWord.value = Object.assign({}, word);
  editModal.value = true;
};

const closeEditModal = () => {
  editModal.value = false;
  selectedWord.value = {};
};

const openDeleteModal = (word) => {
  selectedWord.value = Object.assign({}, word);
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
  selectedWord.value = {};
};

const updateWord = () => {
  //
};
const deleteWord = () => {
  //
};
</script>
