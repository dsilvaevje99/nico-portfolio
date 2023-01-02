<template>
  <div class="flex--column skeleton-loader--container">
    <div
      class="skeleton-loader--item"
      v-for="n in props.lines"
      :key="`${String(loaderId)}-${n}`"
      :style="getWidth(n)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
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
