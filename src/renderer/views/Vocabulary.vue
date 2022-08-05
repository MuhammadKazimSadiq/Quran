<template>
  <h1 class="text-center text-3xl dark:text-white">معانی کلمات</h1>

  <div class="mt-8 flex flex-col">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div
        class="sm-rounded-lg overflow-hidden border-b border-gray-200 shadow"
      >
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

              <th class="relative px-6 py-3"></th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
          >
            <template v-if="store.vocabulary.length">
              <tr v-for="word in store.vocabulary">
                <td
                  class="whitespace-nowrap px-6 py-4 text-lg text-gray-500 dark:text-white"
                >
                  {{ word.word }}
                </td>
                <td
                  class="whitespace-nowrap px-6 py-4 text-lg text-gray-500 dark:text-white"
                >
                  {{ word.meaning }}
                </td>

                <td
                  class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                >
                  <div class="flex justify-center gap-4">
                    <div @click="() => {}" class="cursor-pointer">
                      <EditIcon class="w-4 text-blue-700 dark:text-blue-300" />
                    </div>

                    <div @click="() => {}" class="cursor-pointer">
                      <DeleteIcon class="w-4 text-red-700 dark:text-red-300" />
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td
                colspan="3"
                class="py-4 text-center text-xl text-black dark:text-white"
              >
                کلمه ای هنوز ثبت نشده است!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// store
import { useStore } from "../store/useStore";

// components
import EditIcon from "../components/icons/EditIcon.vue";
import DeleteIcon from "../components/icons/DeleteIcon.vue";

// store
const store = useStore();
</script>
