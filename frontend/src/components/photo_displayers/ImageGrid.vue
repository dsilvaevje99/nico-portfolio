<template>
  <SkeletonLoader v-if="props.images.length === 0" type="image-grid" />
  <div v-else class="photography--grid">
    <div
      v-for="img in props.images"
      class="photo--container"
      :id="`image-${img.id}`"
      :key="img.id"
      tabindex="0"
      role="button"
      @click="toggleModal(img)"
      @keyup.enter="toggleModal(img, true)"
      aria-label="Image tile"
    >
      <img :src="img.url" :alt="img.alt" />
    </div>
  </div>
  <PopupModal :open="open" @close="toggleModal">
    <img :src="modalImg?.url" :alt="modalImg?.alt" />
  </PopupModal>
</template>

<script lang="ts" setup>
import PopupModal from "@/components/PopupModal.vue";
import { ref } from "vue";
import type { Photo } from "@/../../../common-types";
import SkeletonLoader from "../SkeletonLoader.vue";

const props = defineProps({
  images: {
    type: Array as () => Photo[],
    required: true,
  },
});
const open = ref<boolean>(false);
const modalImg = ref<Photo>();
const justClosed = ref<boolean>(false);

const toggleModal = (img?: Photo, usingKeyboard?: Boolean) => {
  if (open.value) {
    // Closing
    justClosed.value = true;
    open.value = false;
    const initialEl = document.getElementById(`image-${modalImg.value?.id}`);
    initialEl?.focus();
  } else {
    // Opening
    if (usingKeyboard && justClosed.value) {
      justClosed.value = false;
      return;
    }
    modalImg.value = img || undefined;
    open.value = true;
  }
};
</script>
