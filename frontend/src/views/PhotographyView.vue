<template>
  <div id="photography--container">
    <h1 class="title nudge-right">Photography</h1>
    <ImageGrid :images="photos" />
  </div>
</template>

<script lang="ts" setup>
import ImageGrid from "@/components/photo_displayers/ImageGrid.vue";
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

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "light")
);
</script>
