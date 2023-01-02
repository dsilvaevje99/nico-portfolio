import { ref } from "vue";
import { defineStore } from "pinia";
import { isLoggedIn } from "@/api/auth.api";

export const useAuthStore = defineStore("auth", () => {
  const loggedIn = ref<boolean>(false);
  const username = ref<string>("");

  const login = (user: string) => {
    loggedIn.value = true;
    username.value = user;
  };
  const logout = () => (loggedIn.value = false);
  const checkLoginStatus = async () => (loggedIn.value = await isLoggedIn());

  return { loggedIn, username, login, logout, checkLoginStatus };
});
