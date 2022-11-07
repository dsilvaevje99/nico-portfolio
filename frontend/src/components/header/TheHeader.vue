<template>
  <header>
    <RouterLink to="/" id="logo-link">
      <img alt="Nicolas Romero" id="logo-img" src="@/assets/logo.svg" />
    </RouterLink>
    <nav class="nav--big-screens">
      <RouterLink to="/" class="title nav-link">Films</RouterLink>
      <RouterLink to="/photography" class="title nav-link"
        >Photography</RouterLink
      >
      <RouterLink to="/about" class="title nav-link">About</RouterLink>
      <RouterLink to="/login" class="title nav-link nav-link--lighter"
        >Login</RouterLink
      >
    </nav>
    <TheMobileMenu />
  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import TheMobileMenu from "@/components/header/TheMobileMenu.vue";
</script>
