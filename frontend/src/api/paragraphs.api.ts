import { Http } from "@/api/http";
import type { Paragraph } from "@/../../common-types";
import { displayError, displaySuccess } from "@/helpers/notificationHelpers";

export const getAllParagraphs = async (): Promise<Paragraph[] | false> => {
  try {
    const res = await Http.Client.get(`${Http.BaseURL}/paragraphs`);

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    displayError(e, "Couldn't get about page content. Try again later!");
    return false;
  }
};

export const saveParagraphs = async (
  paragraphs: Paragraph[]
): Promise<boolean> => {
  try {
    const res = await Http.Client.put(`${Http.BaseURL}/paragraphs`, {
      paragraphs,
    });

    if (res.status === 200) {
      displaySuccess('Successfully saved "About"-page text.');
      return true;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    displayError(e, "Couldn't save paragraphs. Try again later!");
    return false;
  }
};
