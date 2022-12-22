import { Http } from "@/api/http";
import type { AdminURLs, Photo } from "@/../../common-types";
import { displayError, displaySuccess } from "@/helpers/notificationHelpers";

export const getAdminUrls = async (): Promise<AdminURLs | false> => {
  try {
    const res = await Http.Client.get(`${Http.BaseURL}/photos`);

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    return false;
  }
};

export const updateAdminUrls = async (urls: AdminURLs): Promise<boolean> => {
  try {
    const res = await Http.Client.put(`${Http.BaseURL}/photos`, urls);

    if (res.status === 200) {
      displaySuccess("Successfully saved image URLs!");
      return true;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    const response = e.response.data.message;
    const invalidFields =
      typeof response === "object" ? Object.keys(response) : [];
    displayError(
      e,
      invalidFields.length > 0
        ? `Failed to save image URL's due to invalid value in field${
            invalidFields.length > 1 ? "s" : ""
          }: ${invalidFields.join(", ")}`
        : "Failed to save image URL's. Try again later!"
    );
    return false;
  }
};

export const getImgurImages = async (
  hash: string
): Promise<Photo[] | false> => {
  try {
    const res = await Http.Client.get(`${Http.BaseURL}/photos/imgur/${hash}`);

    if (res.status === 200) {
      return res.data.map((img: any) => {
        return {
          id: img.id,
          url: img.link,
          alt: img.description || "",
        };
      });
    } else {
      throw new Error();
    }
  } catch (e: any) {
    console.log(e.response);
    if (e.response.status === 429) {
      displayError(
        e,
        "The image server is temporarily over capacity. Try again later!"
      );
    }
    return false;
  }
};
