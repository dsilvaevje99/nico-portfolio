<template>
  <div class="film--tile-thumbnail">
    <img :src="props.film.thumbnail" alt="Thumbnail" />
    <span v-if="props.film.featured" class="film--featured-badge"
      >Featured</span
    >
  </div>
  <h2 class="film--tile-title">{{ props.film.title }}</h2>
  <p class="film--tile-description">{{ props.film.description }}</p>
  <router-link
    v-if="props.film.featured"
    :to="`/film/${props.film.slug}`"
    class="btn btn--text-primary"
    tabindex="8"
  >
    More about the featured film
    <font-awesome-icon class="iconRight" icon="fa-solid fa-arrow-right" />
  </router-link>
</template>

<script lang="ts" setup>
import type { Film } from "@/../../../common-types";

const props = defineProps({
  film: {
    type: Object as () => Film,
    required: true,
  },
});
</script>
