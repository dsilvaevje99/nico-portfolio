<template>
  <div class="page-container">
    <div>
      <TheHeader />
      <RouterView />
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@/components/header/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<style scoped></style>
