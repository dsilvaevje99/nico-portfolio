<template>
  <div id="photography--container">
    <h1 class="title nudge-right">Photography</h1>
    <div id="photography--grid">
      <div
        v-for="img in photos"
        class="photo--container"
        :key="img"
        @click="openModal(img)"
      >
        <img :src="img" :alt="img" />
      </div>
    </div>
    <PopupModal :open="open" @close="open = false">
      <img :src="modalPhoto" :alt="modalPhoto" />
    </PopupModal>
  </div>
</template>

<script lang="ts" setup>
import PopupModal from "@/components/PopupModal.vue";
import { onBeforeMount, ref } from "vue";

const photos = ref<string[]>([
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
]);
const open = ref<boolean>(false);
const modalPhoto = ref<string>("");

const openModal = (img: string) => {
  modalPhoto.value = img;
  open.value = true;
};

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "light")
);
</script>
