<template>
  <button class="btn nav--toggle-btn" @click="toggleMenu">
    <font-awesome-icon v-if="open" icon="fa-solid fa-xmark" />
    <font-awesome-icon v-else icon="fa-solid fa-bars" />
  </button>
  <div
    :class="`overlay--fullscreen ${open && 'overlay--fullscreen-active'}`"
    @click="toggleMenu"
  ></div>
  <div :class="`nav--container ${open ? 'slide-in' : 'slide-out'}`">
    <div class="nav--relative-container">
      <nav class="nav--mobile-screens">
        <RouterLink to="/" class="title nav-link" @click="toggleMenu"
          >Films</RouterLink
        >
        <RouterLink to="/photography" class="title nav-link" @click="toggleMenu"
          >Photography</RouterLink
        >
        <RouterLink to="/about" class="title nav-link" @click="toggleMenu"
          >About</RouterLink
        >
        <RouterLink
          to="/login"
          class="title nav-link nav-link--lighter nav-link--separate"
          @click="toggleMenu"
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
