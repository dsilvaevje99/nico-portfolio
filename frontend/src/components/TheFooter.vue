<template>
  <footer>
    <SocialIcons />
    <p>© {{ year }} Nicolás Romero</p>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import SocialIcons from "@/components/SocialIcons.vue";

const year = computed(() => new Date().getFullYear());
</script>
