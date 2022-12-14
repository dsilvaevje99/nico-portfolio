<template>
  <div
    :class="`overlay--fullscreen ${props.open && 'overlay--fullscreen-active'}`"
    @click="$emit('close')"
  ></div>
  <transition name="fade">
    <div v-if="props.open" class="modal--container" ref="trapRef" role="dialog">
      <button
        @click="$emit('close')"
        class="btn btn--filled-primary btn--icon-only"
        id="popup-close-btn"
        aria-label="Close dialog"
      >
        <font-awesome-icon v-if="open" icon="fa-solid fa-xmark" />
      </button>
      <div class="modal-content--container">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import useFocusTrap from "@/composables/useFocusTrap";

defineEmits(["close"]);
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const { trapRef } = useFocusTrap();
</script>
