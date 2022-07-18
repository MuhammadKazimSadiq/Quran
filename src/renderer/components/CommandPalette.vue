<template>
  <!-- transition root -->
  <TransitionRoot :show="isOpen" @afterLeave="onClose">
    <!-- dialog -->
    <Dialog
      dir="rtl"
      :open="isOpen"
      @close="isOpen = false"
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
            v-model="selectedPerson"
            @update:modelValue="onSelect(this)"
            class="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-black/5"
          >
            <div class="flex items-center px-4">
              <!-- search icon -->
              <SearchIcon class="h-6 w-6 text-gray-500" />
              <!-- combobox input -->
              <ComboboxInput
                @change="search = $event.target.value"
                class="h-12 w-full border-0 bg-transparent font-farsi text-sm text-gray-800 placeholder-gray-400 focus:ring-0"
                placeholder="جستجو"
              />
            </div>

            <!-- combobox options -->
            <ComboboxOptions
              static
              v-if="filteredPeople.length"
              class="max-h-80 overflow-y-auto py-4 text-sm"
            >
              <!-- combobox option -->
              <ComboboxOption
                v-for="person in filteredPeople"
                v-slot="{ active, selected }"
                :value="person"
                class="cursor-pointer"
              >
                <div
                  class="mx-2 space-x-1 rounded-lg p-4"
                  :class="{ 'bg-gray-100': active }"
                >
                  <span class="font-medium">
                    {{ person }}
                  </span>
                  <span> in {{ person }} </span>
                </div>
              </ComboboxOption>
            </ComboboxOptions>
            <!-- no results found -->
            <div v-else class="p-4 font-farsi text-sm text-gray-500">
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
import SearchIcon from "../components/SearchIcon.vue";

const isOpen = ref(false);

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];
const selectedPerson = ref();
const search = ref("");

const filteredPeople = computed(() =>
  search.value === ""
    ? people
    : people.filter((person) => {
        return person.toLowerCase().includes(search.value.toLowerCase());
      })
);

window.addEventListener("keydown", onKeyDown);

function onKeyDown(e) {
  if (e.key === "k" && (event.metaKey || event.ctrlKey)) {
    isOpen.value = !isOpen.value;
  }
}

const onClose = () => {
  selectedPerson.value = "";
};

const onSelect = (e) => {
  console.log(selectedPerson.value);
  isOpen.value = false;
};
</script>
