<template>
  <div class="photography--grid">
    <div
      v-for="img in props.images"
      class="photo--container"
      :key="img"
      @click="toggleModal(img)"
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

const toggleModal = (img?: string) => {
  if (open.value) {
    document.body.style.overflow = "initial";
    open.value = false;
  } else {
    document.body.style.overflow = "hidden";
    modalImg.value = img || "";
    open.value = true;
  }
};
</script>
