<template>
  <button class="nav--toggle-btn" @click="open = !open">
    <font-awesome-icon v-if="open" icon="fa-solid fa-xmark" />
    <font-awesome-icon v-else icon="fa-solid fa-bars" />
  </button>
  <div
    :class="`nav--overlay ${open && 'nav--overlay-active'}`"
    @click="open = false"
  ></div>
  <div :class="`nav--container ${open ? 'slide-in' : 'slide-out'}`">
    <div class="nav--relative-container">
      <nav class="nav--mobile-screens">
        <RouterLink to="/" class="title nav-link" @click="open = !open"
          >Films</RouterLink
        >
        <RouterLink
          to="/photography"
          class="title nav-link"
          @click="open = !open"
          >Photography</RouterLink
        >
        <RouterLink to="/about" class="title nav-link" @click="open = !open"
          >About</RouterLink
        >
        <RouterLink
          to="/login"
          class="title nav-link nav-link--lighter nav-link--separate"
          @click="open = !open"
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
</script>
