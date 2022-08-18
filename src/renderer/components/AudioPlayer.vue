<template>
  <div
    id="audio-player"
    dir="ltr"
    class="fixed bottom-0 mr-[46px] flex-col bg-gray-50 transition-transform duration-500 dark:bg-gray-800"
    style="width: calc(100% - 46px)"
  >
    <!-- progress -->
    <div class="mx-1">
      <Slider
        v-model="currentTimeProgress"
        @change="seek"
        :tooltips="false"
        :direction="'ltr'"
        :classes="{
          target:
            'relative box-border select-none touch-none tap-highlight-transparent touch-callout-none disabled:cursor-not-allowed',
          focused: 'slider-focused',
          tooltipFocus: 'slider-tooltip-focus',
          tooltipDrag: 'slider-tooltip-drag',
          ltr: 'slider-ltr',
          rtl: 'slider-rtl',
          horizontal: 'slider-horizontal h-1.5',
          textDirectionRtl: 'slider-txt-rtl',
          textDirectionLtr: 'slider-txt-ltr',
          base: 'w-full h-full relative z-1 bg-gray-300 dark:bg-gray-500 rounded',
          connects: 'w-full h-full relative overflow-hidden z-0 rounded',
          connect:
            'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-gray-500  dark:bg-gray-300 cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed',
          origin:
            'slider-origin absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full h:h-0 v:-top-full txt-rtl-h:left-0 txt-rtl-h:right-auto v:w-0 tap:duration-300 tap:transition-transform',
          handle:
            'absolute rounded-full bg-white border-0 shadow-slider cursor-grab focus:outline-none h:w-4 h:h-4 h:-top-1.5 h:-right-2 txt-rtl-h:-left-2 txt-rtl-h:right-auto v:w-4 v:h-4 v:-top-2 v:-right-1.25 disabled:cursor-not-allowed focus:ring focus:ring-gray-500 focus:ring-opacity-30',
          handleLower: 'slider-hande-lower',
          handleUpper: 'slider-hande-upper',
          touchArea: 'h-full w-full',
          active: 'slider-active shadow-slider-active cursor-grabbing',
          draggable: 'cursor-ew-resize v:cursor-ns-resize',
          tap: 'slider-state-tap',
          drag: 'slider-state-drag',
        }"
      />
    </div>
    <!-- progress end -->

    <div class="flex flex-row items-center justify-between px-6 py-4">
      <div
        class="flex shrink-0 grow-0 basis-1/3 items-center justify-start gap-8"
      >
        <!-- current time -->
        <div class="text-black dark:text-white">
          {{ parseTime(currentTime) }}
        </div>
        <!-- current time end -->

        <div class="ml-12 flex items-center justify-between gap-8">
          <!-- reciters -->
          <div>
            <select
              dir="rtl"
              v-model="settings.selectedReciter"
              @change="changeReciter"
              class="w-full rounded-2xl border-2 border-gray-300/60 text-gray-600 focus:border-gray-700/60 focus:outline-0 focus:ring-0 dark:border-gray-500/60 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-gray-300/60"
            >
              <option v-for="reciter in store.reciters" :value="reciter.id">
                {{ reciter.name }}
              </option>
            </select>
          </div>
          <!-- reciters end -->

          <!-- chapter & verse -->
          <div class="p-2">
            <div class="font-farsi text-lg text-black dark:text-white">
              {{ verse?.chapter_name }} : {{ verse?.verse_id }}
            </div>
          </div>
          <!-- chapter & verse end -->
        </div>
      </div>

      <!-- icons -->
      <div class="flex shrink-0 grow-0 basis-1/3 flex-row justify-center gap-8">
        <div>
          <RewindIcon
            @click="prev()"
            class="w-8 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
          />
        </div>
        <div>
          <LoaderIcon
            v-if="loading"
            class="w-8 animate-spin fill-gray-400 text-gray-200 dark:text-gray-600"
          />
          <PauseIcon
            v-else-if="isPlaying"
            @click="pause()"
            class="w-8 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
          />
          <PlayIcon
            v-else
            @click="play()"
            class="w-8 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
          />
        </div>
        <div>
          <FastForwardIcon
            @click="next()"
            class="w-8 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
          />
        </div>
      </div>
      <!-- icons end -->

      <div
        class="flex shrink-0 grow-0 basis-1/3 items-center justify-end gap-8"
      >
        <div class="-ml-12 flex items-center gap-4">
          <!-- volume -->
          <div class="flex gap-2">
            <component
              :is="player?.muted ? VolumeOffIcon : VolumeUpIcon"
              class="w-6 cursor-pointer text-gray-800 text-opacity-70 hover:text-black dark:text-gray-200 dark:hover:text-white"
              @click="toggleMute"
            />
            <input
              v-show="!player?.muted"
              v-model="volume"
              @input="changeVolume"
              type="range"
              min="0"
              max="1"
              step="0.01"
            />
          </div>
          <!-- volume end -->

          <!-- speed -->
          <div
            @click="changeSpeed"
            class="justify flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full bg-gray-200 p-1 text-black dark:bg-gray-600 dark:text-white"
          >
            <span class="text-xs">x</span>
            <span class="text-sm lowercase">{{ speed }}</span>
          </div>
          <!-- speed end -->
        </div>

        <!-- duration -->
        <div class="text-black dark:text-white">
          {{ parseTime(duration) }}
        </div>
        <!-- duration end -->
      </div>
    </div>
  </div>
  <audio
    @ended="onEnd"
    @playing="onPlaying"
    @timeupdate="onTimeUpdate"
    @loadeddata="loaded = true"
    ref="player"
  >
    <source :src="url" type="audio/mpeg" />
  </audio>
</template>

<script setup>
// vue
import { ref, reactive, computed, onMounted, inject } from "vue";

// router
import { useRoute, useRouter } from "vue-router";

// pinia
import { storeToRefs } from "pinia";

// store
import { useStore } from "../store/store";

// composables
import { useScrollTo } from "../composables/scrollTo";

// components
import LoaderIcon from "../components/LoaderIcon.vue";
import {
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  RewindIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/vue/outline";
import Slider from "@vueform/slider";

// store
const store = useStore();

// route
const route = useRoute();

// router
const router = useRouter();

// event emitter
const emitter = inject("emitter");

emitter.on("play", async ({ id }) => {
  verseId.value = id;
  await load();
  play();
});

// data
const { settings } = storeToRefs(store);
const player = ref(null);
const verseId = ref(1);
const prevVerseId = ref(0);
const isPlaying = ref(false);
const speed = ref(1);
const volume = ref(1);
const currentTime = ref("0");
const duration = ref("0");
const currentTimeProgress = ref(0);
const loading = ref(false);
const loaded = ref(false);

const verse = computed(() => {
  return store.verses.find((verse) => verse.id === verseId.value);
});

const prevVerse = computed(() => {
  return store.verses.find((verse) => verse.id === prevVerseId.value);
});

const reciter = computed(() => {});

// events

// keyboard shortcuts
window.addEventListener("keypress", (e) => {
  // if (e.key === " ") {
  //   isPlaying.value ? pause() : play();
  // }

  if (e.key === "m" || e.key === "ئ") toggleMute();
});

const onEnd = () => {
  loading.value = true;
  loaded.value = false;
  next();
};

const onPlaying = (e) => {
  duration.value = Math.floor(e.target.duration);
  loading.value = false;
};

const onTimeUpdate = (e) => {
  let { currentTime: _currentTime, duration: _duration } = e.target;
  currentTime.value = Math.floor(_currentTime);
  currentTimeProgress.value = isNaN(_duration)
    ? 0
    : (_currentTime / _duration) * 100;
};

// methods
const load = async () => {
  await player.value.load();
  // scroll to verse
  scrollToVerse();
};

const play = async () => {
  if (!loaded.value) await load();

  isPlaying.value = true;
  player.value.play();
};

const pause = () => {
  isPlaying.value = false;
  player.value.pause();
};

const next = async () => {
  prevVerseId.value = verseId.value;
  verseId.value += 1;
  await load();
  play();
};

const prev = async () => {
  prevVerseId.value = verseId.value;
  verseId.value -= 1;
  await load();
  play();
};

const changeVolume = () => {
  player.value.volume = volume.value;
};

const toggleMute = () => {
  player.value.muted = !player.value.muted;
};

const changeSpeed = () => {
  const speeds = [0.5, 1, 1.5, 2];
  const index = speeds.indexOf(speed.value);
  if (index === speeds.length - 1) speed.value = speeds[0];
  else speed.value = speeds[index + 1];
  player.value.playbackRate = speed.value;
};

const seek = (time) => {
  player.value.currentTime = (time / 100) * duration.value;
};

const changeReciter = async () => {
  pause();
  await load();
  store.changeSelectedReciter(settings.value.selectedReciter);
};

const scrollToVerse = () => {
  if (route.name !== "Read") return;

  if (
    prevVerse.value &&
    verse.value.chapter_id !== prevVerse.value.chapter_id
  ) {
    router.push(`/read/${verse.value.chapter_id}`);
    setTimeout(() => highlight(), 500);
    return;
  }
  highlight();
};

const highlight = () => {
  const el = document.querySelector(`.verse-${verse.value.id}`);
  useScrollTo(el);

  // remove highlight from previous verse
  const prevEl = document.querySelector(`.verse-${prevVerse.value?.id}`);
  prevEl?.classList?.remove("bg-yellow-100", "dark:bg-yellow-800/60");
  const highlighted = document.getElementsByClassName(
    "verse bg-yellow-100 dark:bg-yellow-800/60"
  );
  [...highlighted].forEach((e) =>
    e?.classList?.remove("bg-yellow-100", "dark:bg-yellow-800/60")
  );

  // highligh current verse
  el?.classList?.add("bg-yellow-100", "dark:bg-yellow-800/60");
};

// helper functions
const url = computed(() => {
  const reciter = store.reciters.find(
    (r) => r.id === parseInt(settings.value.selectedReciter)
  );
  return verse.value && reciter
    ? `${reciter.url}/${parse(verse.value.chapter_id)}${parse(
        verse.value.verse_id
      )}.mp3`
    : "";
});

const parse = (number) => {
  return number < 10 ? `00${number}` : number < 100 ? `0${number}` : number;
};

const parseTime = (time) => {
  let mins = Math.floor(time / 60);
  let secs = time % 60;
  mins = mins < 10 ? `0${mins}` : mins;
  secs = secs < 10 ? `0${secs}` : secs;
  return `${mins}:${secs}`;
};
</script>
