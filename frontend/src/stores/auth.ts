import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const loggedIn = ref<boolean>(false);

  const login = () => (loggedIn.value = true);
  const logout = () => (loggedIn.value = false);

  return { loggedIn, login, logout };
});
