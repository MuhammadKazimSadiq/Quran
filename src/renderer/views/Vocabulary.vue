<template>
  <h1 class="text-center text-3xl dark:text-white">معانی کلمات</h1>

  <div class="mt-8 flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                    <svg
                      class="w-4 text-blue-700 dark:text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>

                    <svg
                      class="w-4 text-red-700 dark:text-red-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// store
import { useStore } from "../store/useStore";

// store
const store = useStore();
</script>
