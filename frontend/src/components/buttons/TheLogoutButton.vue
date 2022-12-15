<template>
  <button id="btn--logout" @click="completeLogout">
    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
  </button>
</template>

<script lang="ts" setup>
import { logout } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAuthStore();

const completeLogout = async () => {
  const loggedOut = await logout(store.username);
  if (loggedOut) {
    localStorage.removeItem("jwt");
    store.logout();
    router.push("/");
  }
};
</script>
