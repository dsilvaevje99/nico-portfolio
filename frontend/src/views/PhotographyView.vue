<template>
  <p>Photography</p>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "light")
);
</script>
