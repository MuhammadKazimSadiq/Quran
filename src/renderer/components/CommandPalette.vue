<template>
  <!-- transition root -->
  <TransitionRoot :show="store.commandPalette" @afterLeave="onClose">
    <!-- dialog -->
    <Dialog
      :class="store?.settings?.theme"
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
            v-model="selectedOption"
            @update:modelValue="onSelect"
            class="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-black/5 dark:bg-gray-800"
          >
            <div class="flex items-center px-4">
              <!-- search icon -->
              <SearchIcon class="h-6 w-6 text-gray-500" />
              <!-- combobox input -->
              <ComboboxInput
                @change="onSearch($event.target.value)"
                class="h-16 w-full border-0 bg-transparent font-farsi text-lg text-gray-800 placeholder-gray-400 focus:ring-0 dark:text-gray-200 dark:placeholder-gray-400"
                placeholder="جستجو"
                :displayValue="(option) => option?.text"
              />
            </div>

            <!-- combobox options -->
            <ComboboxOptions
              static
              v-if="search.length >= 3"
              class="max-h-80 overflow-y-auto py-4 text-sm"
            >
              <!-- combobox option -->

              <!-- chapters -->
              <div
                class="px-4 py-2 font-farsi text-sm font-bold text-black dark:text-white"
              >
                سوره
                <span class="text-xs text-gray-600 dark:text-gray-400">
                  ({{ filteredChapters.length }} مورد)
                </span>
              </div>
              <template v-if="filteredChapters.length">
                <ComboboxOption
                  v-for="chapter in filteredChapters"
                  v-slot="{ active, selected }"
                  :value="chapter"
                  class="cursor-pointer"
                >
                  <div
                    class="mx-2 space-x-1 rounded-lg p-4"
                    :class="{ 'bg-gray-100 dark:bg-gray-700': active }"
                  >
                    <span
                      class="font-farsi text-lg font-medium leading-relaxed dark:text-gray-200"
                      v-html="chapter.text"
                    >
                    </span>
                  </div>
                </ComboboxOption>
              </template>
              <template v-else>
                <div
                  class="px-4 py-2 text-center font-farsi text-sm text-gray-700 dark:text-gray-300"
                >
                  موردی یافت نشد!
                </div>
              </template>

              <!-- verses -->
              <div
                class="px-4 py-2 font-farsi text-sm font-bold text-black dark:text-white"
              >
                آیه
                <span class="text-xs text-gray-600 dark:text-gray-400">
                  ({{ filteredVerses.length }} مورد)
                </span>
              </div>
              <template v-if="filteredVerses.length">
                <ComboboxOption
                  v-for="verse in filteredVerses"
                  v-slot="{ active, selected }"
                  :value="verse"
                  class="cursor-pointer"
                >
                  <div
                    class="mx-2 space-x-1 rounded-lg p-4"
                    :class="{ 'bg-gray-100 dark:bg-gray-700': active }"
                  >
                    <span
                      class="font-farsi text-lg font-medium leading-relaxed text-black dark:text-white"
                      v-html="verse.text"
                    >
                    </span>
                  </div>
                </ComboboxOption>
              </template>
              <template v-else>
                <div
                  class="px-4 py-2 text-center font-farsi text-sm text-gray-700 dark:text-gray-300"
                >
                  موردی یافت نشد!
                </div>
              </template>
            </ComboboxOptions>

            <!-- available commands -->
            <div v-else class="p-4 font-farsi">
              <div
                class="text-center text-xl font-bold text-gray-500 dark:text-gray-300"
              >
                دستورات موجود
              </div>
              <div class="mt-4 mr-2 flex flex-col gap-6 text-lg">
                <div class="flex gap-4">
                  <div class="dark:text-gray-300">جستجوی سوره:</div>
                  <div class="text-green-800 dark:text-green-300">
                    `سوره بقره`
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="dark:text-gray-300">جستجوی آیه:</div>
                  <div class="text-green-800 dark:text-green-300">
                    `بسم الله...`
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="dark:text-gray-300">
                    جستجوی شماره با شماره سوره و آیه:
                  </div>
                  <div class="text-green-800 dark:text-green-300">
                    `سوره انسان: 10` یا `36:10`
                  </div>
                </div>
              </div>
            </div>
          </Combobox>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
// vue
import { ref, computed } from "vue";

// components
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
import SearchIcon from "../components/icons/SearchIcon.vue";

// store
import { useStore } from "../store/useStore";

// router
import { useRouter } from "vue-router";

// composables
import { useHighlight } from "../composables/highlight";

// store
const store = useStore();
// router
const router = useRouter();

const search = ref("");
const selectedOption = ref();
let timeoutID = ref(null);

const onClose = () => {
  search.value = "";
  selectedOption.value = "";
};

const onSelect = () => {
  const selected = selectedOption.value;
  if (selected.verseId) {
    store.$patch({
      scrollTo: {
        verse: selected.verseId,
      },
    });
  }
  router.push(`/read/${selected.chapterId}`);
  store.commandPalette = false;
  onClose();
};

const onSearch = (value) => {
  clearTimeout(timeoutID.value);
  timeoutID.value = setTimeout(() => (search.value = value.trim()), 500);
};

const filteredChapters = computed(() => {
  if (search.value.length <= 2) return [];
  // remove diacritics from query
  const query = search.value.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();
  return store.chapters
    .filter((chapter) => `سوره ${chapter.name}`.includes(query))
    .map((chapter) => {
      return {
        text: `سوره ${chapter.name}`,
        chapterId: chapter.id,
      };
    });
});

const filteredVerses = computed(() => {
  if (search.value.length <= 2) return [];
  // remove diacritics from query
  const query = search.value.replace(/َ|ُ|ِ|ّ|ً|ٌ|ٍ|ْ/g, "").trim();
  return store.verses
    .filter(
      (verse) =>
        verse.text_clean.includes(query) ||
        query.match(
          new RegExp(
            `^(سوره )?${verse.chapter_name}(\\s+)?:(\\s+)?${verse.verse_id}$`
          )
        ) ||
        query.match(
          new RegExp(`${verse.chapter_id}(\\s+)?:(\\s+)?${verse.verse_id}$`)
        )
    )
    .map((verse) => {
      return {
        text: `${useHighlight({
          text: verse.text_original,
          search: query,
          highlightClasses: "bg-yellow-200 dark:bg-yellow-800 rounded-lg",
        })} <span class="text-sm text-gray-600 dark:text-gray-300">[${
          verse.chapter_name
        } : ${verse.verse_id}]</span>`,
        chapterId: verse.chapter_id,
        verseId: verse.verse_id,
      };
    });
});
</script>
