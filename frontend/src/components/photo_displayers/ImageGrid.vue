<template>
  <div class="photography--grid">
    <div
      v-for="img in props.images"
      class="photo--container"
      :id="`image-${img.id}`"
      :key="img.id"
      tabindex="0"
      role="button"
      @click="toggleModal(img)"
      @keyup.enter="toggleModal(img, true)"
    >
      <img :src="img.url" :alt="img.url" />
    </div>
  </div>
  <PopupModal :open="open" @close="toggleModal">
    <img :src="modalImg?.url" :alt="modalImg?.url" />
  </PopupModal>
</template>

<script lang="ts" setup>
import PopupModal from "@/components/PopupModal.vue";
import { ref } from "vue";
import type { Photo } from "@/../../../common-types";

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
