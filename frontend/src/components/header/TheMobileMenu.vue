<template>
  <button class="btn nav--toggle-btn" @click="toggleMenu" tabindex="2">
    <font-awesome-icon v-if="open" icon="fa-solid fa-xmark" />
    <font-awesome-icon v-else icon="fa-solid fa-bars" />
  </button>
  <div
    :class="`overlay--fullscreen ${open && 'overlay--fullscreen-active'}`"
    id="nav-overlay"
    @click="toggleMenu"
  ></div>
  <div :class="`nav--container ${open ? 'slide-in' : 'slide-out'}`">
    <div class="nav--relative-container">
      <nav class="nav--mobile-screens">
        <RouterLink
          to="/"
          class="title nav-link"
          @click="toggleMenu"
          tabindex="3"
          >Films</RouterLink
        >
        <RouterLink
          to="/photography"
          class="title nav-link"
          @click="toggleMenu"
          tabindex="4"
          >Photography</RouterLink
        >
        <RouterLink
          to="/about"
          class="title nav-link"
          @click="toggleMenu"
          tabindex="5"
          >About</RouterLink
        >
        <RouterLink
          v-if="store.loggedIn"
          to="/admin"
          class="title nav-link nav-link--lighter nav-link--separate"
          @click="toggleMenu"
          tabindex="6"
          >Admin</RouterLink
        >
        <RouterLink
          v-else
          to="/login"
          class="title nav-link nav-link--lighter nav-link--separate"
          @click="toggleMenu"
          tabindex="6"
          >Login</RouterLink
        >
      </nav>
    </div>
    <SocialIcons />
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import SocialIcons from "@/components/SocialIcons.vue";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

const open = ref(false);

const toggleMenu = () => {
  if (open.value) {
    document.body.style.overflow = "initial";
    open.value = false;
  } else {
    document.body.style.overflow = "hidden";
    open.value = true;
  }
};
</script>
