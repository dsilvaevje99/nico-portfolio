<template>
  <Carousel
    :settings="settings"
    :breakpoints="breakpoints"
    :autoplay="8000"
    :wrap-around="true"
  >
    <Slide v-for="img in store.aboutCarouselImages" :key="img.id">
      <img
        :src="img.url"
        :alt="`Image ${img.id}`"
        class="carousel--image-fallback"
      />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script lang="ts" setup>
//Carousel docs: https://ismail9k.github.io/vue3-carousel/
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { usePhotoStore } from "@/stores/photo";

const store = usePhotoStore();

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
};
const breakpoints = {
  800: {
    itemsToShow: 1.5,
    snapAlign: "center",
  },
  1400: {
    itemsToShow: 2,
    snapAlign: "center",
  },
};
</script>
