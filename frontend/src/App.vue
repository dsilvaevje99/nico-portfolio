<template>
  <div id="page--container">
    <div>
      <TheHeader />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
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
