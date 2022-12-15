import { Http } from "@/api/http";

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
    const res = await Http.Client.post(`${Http.BaseURL}/logout`);

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
      return res.data;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};
