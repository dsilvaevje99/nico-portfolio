<template>
  <div
    :class="`overlay--fullscreen ${props.open && 'overlay--fullscreen-active'}`"
    @click="$emit('close')"
  >
    <div class="overlay--mobile-relative">
      <button
        @click="$emit('close')"
        class="btn btn--icon-only"
        id="popup-close-btn--mobile"
        aria-label="Close dialog"
      >
        <font-awesome-icon v-if="open" icon="fa-solid fa-xmark" />
      </button>
    </div>
  </div>
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
import { watch } from "vue";
import useFocusTrap from "@/composables/useFocusTrap";

defineEmits(["close"]);
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

watch(props, () => {
  if (props.open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "initial";
  }
});

const { trapRef } = useFocusTrap();
</script>
