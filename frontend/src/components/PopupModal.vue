<template>
  <div
    :class="`overlay--fullscreen ${props.open && 'overlay--fullscreen-active'}`"
    @click="$emit('close')"
  ></div>
  <transition name="fade">
    <div v-if="props.open" class="modal--container">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});
</script>
