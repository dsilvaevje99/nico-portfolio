<template>
  <div v-if="props.type === 'image-grid'" class="photography--grid">
    <div
      v-for="n in 10"
      :key="`${String(loaderId)}-${n}`"
      class="skeleton-loader--item skeleton-loader--image photo--container"
    ></div>
  </div>
  <div v-else class="flex--column skeleton-loader--text-container">
    <div
      class="skeleton-loader--item skeleton-loader--text"
      v-for="n in props.lines"
      :key="`${String(loaderId)}-${n}`"
      :style="getWidth(n)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
  },
  lines: {
    type: Number,
    required: false,
    default: 1,
  },
});

const loaderId = ref<symbol>(Symbol());

const getWidth = (number: Number) => {
  const min = number === props.lines ? 25 : 75; // Make last line possibly shorter
  const max = 90;
  const width = Math.floor(Math.random() * (min - max + 1) + max);
  return { width: `${width}%` };
};
</script>
