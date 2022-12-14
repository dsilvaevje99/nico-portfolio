import { Http } from "@/api/http";
import type { Film } from "@/../../common-types";

export const getAllFilms = async (): Promise<Film[] | false> => {
  try {
    const res = await Http.Client.get(`${Http.BaseURL}/films`);

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};

export const saveNewFilm = async (payload: Film): Promise<boolean> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, frames, ...film } = payload;
    const res = await Http.Client.post(`${Http.BaseURL}/films`, film);

    if (res.status === 200) {
      return true;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};

export const saveEditedFilm = async (film: Film): Promise<Film | false> => {
  try {
    const res = await Http.Client.put(
      `${Http.BaseURL}/films/${film._id}`,
      film
    );

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};
