<template>
  <div id="photography--container">
    <h1 class="title nudge-right">Photography</h1>
    <ImageGrid :images="store.photoPageImages" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { usePhotoStore } from "@/stores/photo";
import ImageGrid from "@/components/photo_displayers/ImageGrid.vue";

const store = usePhotoStore();

onBeforeMount(() => {
  document.documentElement.setAttribute("data-theme", "light");
});
</script>
