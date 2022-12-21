import { Http } from "@/api/http";
import type { Inquiry } from "@/../../common-types";
import { displayError } from "@/helpers/notificationHelpers";

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
    displayError(e, "Failed to send inquiry. Try again later!");
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
    displayError(
      e,
      `Inquiry by ${inquiry.name} could not be marked as open. It is likely invalid, and should be deleted.`
    );
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
    displayError(e, "Could not delete inquiry. Try again later!");
    return false;
  }
};
