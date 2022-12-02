<template>
  <div class="flex--column admin-films-arrows--container">
    <button
      class="btn btn--size-xs btn--icon-only"
      @click="$emit('click', -1)"
      :disabled="props.disableUp"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-up" />
    </button>
    <button
      class="btn btn--size-xs btn--icon-only"
      @click="$emit('click', 1)"
      :disabled="props.disableDown"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-down" />
    </button>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["click"]);

const props = defineProps({
  disableUp: {
    type: Boolean,
    required: false,
    default: false,
  },
  disableDown: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
