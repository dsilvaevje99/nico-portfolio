import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const loggedIn = ref<boolean>(false);
  const username = ref<string>("");

  const login = (user: string) => {
    loggedIn.value = true;
    username.value = user;
  };
  const logout = () => (loggedIn.value = false);

  return { loggedIn, username, login, logout };
});
