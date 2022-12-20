import { Http } from "@/api/http";
import type { Inquiry } from "@/../../common-types";

export const getAllInquiries = async (): Promise<Inquiry[] | false> => {
  try {
    const res = await Http.Client.get(`${Http.BaseURL}/inquiries`);

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};

export const saveNewInquiry = async (payload: Inquiry): Promise<boolean> => {
  try {
    const { _id, ...inquiry } = payload;
    const res = await Http.Client.post(`${Http.BaseURL}/inquiries`, inquiry);

    if (res.status === 200) {
      return true;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};

export const updateInquiry = async (inquiry: Inquiry): Promise<boolean> => {
  try {
    const res = await Http.Client.put(
      `${Http.BaseURL}/inquiries/${inquiry._id}`,
      inquiry
    );

    if (res.status === 200) {
      return true;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};

export const deleteInquiry = async (id: string): Promise<boolean> => {
  try {
    const res = await Http.Client.delete(`${Http.BaseURL}/inquiries/${id}`);

    if (res.status === 200) {
      return true;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};
