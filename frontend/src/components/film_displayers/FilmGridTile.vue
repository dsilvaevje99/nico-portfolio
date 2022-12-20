<template>
  <div class="film--tile-thumbnail">
    <img :src="props.film.thumbnail" alt="Thumbnail" />
  </div>
  <h2 class="film--tile-title" v-html="props.film.title"></h2>
  <p class="film--tile-description" v-html="props.film.description"></p>
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
