<template>
  <div
    :class="`film--tile-container ${
      props.film.featured ? 'film--featured-film' : ''
    } ${
      props.nr !== 0 && props.nr % 8 === 0
        ? 'film--tile-big'
        : nr !== 0 && props.nr % 4 === 0
        ? 'film--tile-big film--tile-right'
        : ''
    }`"
  >
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
    >
      More about the featured film
      <font-awesome-icon class="iconRight" icon="fa-solid fa-arrow-right" />
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { Film } from "@/../../../common-types";

const props = defineProps({
  nr: {
    type: Number,
    required: true,
  },
  film: {
    type: Object as () => Film,
    required: true,
  },
});
</script>
