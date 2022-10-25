<template>
  <p>Film details</p>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "dark")
);
</script>
