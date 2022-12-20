import { Http } from "@/api/http";
import { useAuthStore } from "@/stores/auth";
import VueJwtDecode from "vue-jwt-decode";

export const login = async (
  username: string,
  password: string
): Promise<boolean> => {
  try {
    const res = await Http.Client.post(`${Http.BaseURL}/login`, {
      username,
      password,
    });

    if (res.status === 200) {
      localStorage.setItem("jwt", res.data.token);
      return true;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};

export const logout = async (username: string): Promise<boolean> => {
  try {
    const res = await Http.Client.post(`${Http.BaseURL}/logout`, { username });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const res = await Http.Client.get(`${Http.BaseURL}/login/status`);

    if (res.status === 200) {
      const store = useAuthStore();
      const token = localStorage.getItem("jwt");
      const decoded = VueJwtDecode.decode(token);
      store.username = decoded.username;
      return res.data;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};
