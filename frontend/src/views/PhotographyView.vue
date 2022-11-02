<template>
  <div class="photography--container">
    <h1 class="title nudge-right">Photography</h1>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "light")
);
</script>
