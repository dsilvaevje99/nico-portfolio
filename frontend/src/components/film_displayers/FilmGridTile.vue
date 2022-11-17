<template>
  <div class="film--tile-thumbnail">
    <img :src="props.film.thumbnail" alt="Thumbnail" />
  </div>
  <h2 class="film--tile-title">{{ props.film.title }}</h2>
  <p class="film--tile-description">{{ props.film.description }}</p>
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
