<template>
  <div class="photography--grid">
    <div
      v-for="(img, index) in props.images"
      class="photo--container"
      :id="`image-${img}-${index}`"
      :key="img"
      tabindex="0"
      role="button"
      @click="toggleModal(img)"
      @keyup.enter="toggleModal(img, index)"
    >
      <img :src="img" :alt="img" />
    </div>
  </div>
  <PopupModal :open="open" @close="toggleModal">
    <img :src="modalImg" :alt="modalImg" />
  </PopupModal>
</template>

<script lang="ts" setup>
import PopupModal from "@/components/PopupModal.vue";
import { ref } from "vue";

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true,
  },
});
const open = ref<boolean>(false);
const modalImg = ref<string>("");
const imgIndex = ref<number>(); // can remove index guard when no longer using mock data
const justClosed = ref<boolean>(false);

const toggleModal = (img?: string, index?: number) => {
  if (open.value) {
    // Closing
    justClosed.value = true;
    document.body.style.overflow = "initial";
    open.value = false;
    const initialEl = document.getElementById(
      `image-${modalImg.value}-${imgIndex.value}`
    );
    initialEl?.focus();
  } else {
    // Opening
    if (justClosed.value) {
      justClosed.value = false;
      return;
    }
    document.body.style.overflow = "hidden";
    modalImg.value = img || "";
    imgIndex.value = index || undefined;
    open.value = true;
  }
};
</script>
