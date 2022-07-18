<template>
  <!-- transition root -->
  <TransitionRoot :show="store.commandPalette" @afterLeave="onClose">
    <!-- dialog -->
    <Dialog
      dir="rtl"
      @close="store.commandPalette = false"
      class="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]"
    >
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75" />
      </TransitionChild>

      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <!-- dialog panel -->
        <DialogPanel>
          <!-- combobox -->
          <Combobox
            as="div"
            v-model="selectedChapter"
            @update:modelValue="onSelect"
            class="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-black/5"
          >
            <div class="flex items-center px-4">
              <!-- search icon -->
              <SearchIcon class="h-6 w-6 text-gray-500" />
              <!-- combobox input -->
              <ComboboxInput
                @change="search = $event.target.value"
                class="h-16 w-full border-0 bg-transparent font-farsi text-lg text-gray-800 placeholder-gray-400 focus:ring-0"
                placeholder="جستجو"
              />
            </div>

            <!-- combobox options -->
            <ComboboxOptions
              static
              v-if="filteredChapters.length"
              class="max-h-80 overflow-y-auto py-4 text-sm"
            >
              <!-- combobox option -->
              <ComboboxOption
                v-for="chapter in filteredChapters"
                v-slot="{ active, selected }"
                :value="chapter.name"
                class="cursor-pointer"
              >
                <div
                  class="mx-2 space-x-1 rounded-lg p-4"
                  :class="{ 'bg-gray-100': active }"
                >
                  <span class="font-medium">
                    {{ chapter.name }}
                  </span>
                </div>
              </ComboboxOption>
            </ComboboxOptions>
            <!-- no results found -->
            <div
              v-else
              class="p-4 text-center font-farsi text-lg text-gray-500"
            >
              <p>موردی یافت نشد!</p>
            </div>
          </Combobox>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { useStore } from "../store/useStore";

import SearchIcon from "../components/SearchIcon.vue";

const emit = defineEmits(["toggle"]);

const store = useStore();

const selectedChapter = ref();
const search = ref("");

const filteredChapters = computed(() =>
  search.value === ""
    ? store.chapters
    : store.chapters.filter((chapter) => {
        return chapter.name.includes(search.value);
      })
);

const onClose = () => {
  selectedChapter.value = "";
};

const onSelect = () => {
  // console.log(selectedChapter.value);
  store.commandPalette = false;
};
</script>
