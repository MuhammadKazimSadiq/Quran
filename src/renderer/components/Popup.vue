<template>
  <div
    v-show="show"
    ref="popup"
    class="popup fixed z-50 rounded-lg bg-white p-4 drop-shadow dark:bg-gray-800"
    :style="`top: ${position.y}px; left: ${position.x}px;`"
  >
    <slot></slot>
  </div>
</template>

<script setup>
// vue
import { defineProps } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 }),
  },
});
</script>
