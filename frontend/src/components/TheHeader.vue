<template>
  <header>
    <img alt="Nicolas Romero" class="logo" src="@/assets/logo.svg" />
    <nav>
      <RouterLink to="/" class="title nav-link">Films</RouterLink>
      <RouterLink to="/photography" class="title nav-link"
        >Photography</RouterLink
      >
      <RouterLink to="/about" class="title nav-link">About</RouterLink>
      <RouterLink to="/login" class="title nav-link nav-link--lighter"
        >Login</RouterLink
      >
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding-left: var(--page-padding);
}

img {
  padding: 3rem 0;
  filter: var(--logo-filter);
  width: 6rem;
}

nav {
  display: flex;
  align-items: flex-end;
  height: fit-content;
  transform: translateX(2.5em) translateY(-0.9em);
}

.nav-link {
  text-decoration: none;
  text-transform: uppercase;
  color: var(--text-secondary);
  padding: 0 0.5em;
  transition: var(--text-hover-transition);
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link--lighter {
  color: var(--text-tertiary);
}

.router-link-exact-active {
  color: var(--text-primary);
}
</style>
