<template>
  <p>Login</p>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "admin")
);
</script>
