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
    <TheLogoutButton v-if="authStore.loggedIn" />
    <TheNotificationStack />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { usePhotoStore } from "@/stores/photo";
import { isLoggedIn } from "@/api/auth.api";
import { useAuthStore } from "./stores/auth";
import { RouterView } from "vue-router";
import TheHeader from "@/components/header/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheLogoutButton from "@/components/buttons/TheLogoutButton.vue";
import TheNotificationStack from "@/components/cards/TheNotificationStack.vue";

const photoStore = usePhotoStore();
const authStore = useAuthStore();

onBeforeMount(async () => {
  authStore.loggedIn = await isLoggedIn();

  if (photoStore.photoPageImages.length <= 0) {
    photoStore.initialFetch();
  }
});
</script>

<style scoped></style>
