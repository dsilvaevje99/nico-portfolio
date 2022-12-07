<template>
  <header>
    <RouterLink to="/" id="logo-link" tabindex="1">
      <img alt="Nicolas Romero" id="logo-img" src="@/assets/logo.svg" />
    </RouterLink>
    <nav class="nav--big-screens">
      <RouterLink to="/" class="title nav-link" tabindex="2">Films</RouterLink>
      <RouterLink to="/photography" class="title nav-link" tabindex="3"
        >Photography</RouterLink
      >
      <RouterLink to="/about" class="title nav-link" tabindex="4"
        >About</RouterLink
      >
      <RouterLink
        v-if="store.loggedIn"
        to="/admin"
        class="title nav-link nav-link--lighter"
        tabindex="5"
        >Admin</RouterLink
      >
      <RouterLink
        v-else
        to="/login"
        class="title nav-link nav-link--lighter"
        tabindex="5"
        >Login</RouterLink
      >
    </nav>
    <TheMobileMenu />
  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import TheMobileMenu from "@/components/header/TheMobileMenu.vue";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();
</script>
