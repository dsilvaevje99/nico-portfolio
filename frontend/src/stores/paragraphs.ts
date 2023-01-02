import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Paragraph } from "@/../../../common-types";
import { getAllParagraphs, saveParagraphs } from "@/api/paragraphs.api";

export const useParagraphStore = defineStore("paragraphs", () => {
  const empty = { _id: "", name: "", body: "" };
  const loading = ref<boolean>(false);
  const showSavingLoader = ref<boolean>(false);
  const intro = ref<Paragraph>(empty);
  const background = ref<Paragraph>(empty);
  const processOne = ref<Paragraph>(empty);
  const processTwo = ref<Paragraph>(empty);
  const processThree = ref<Paragraph>(empty);
  const dbCopy = ref<Paragraph[]>([]);
  const fieldsValidity = ref<any>({
    intro: true,
    background: true,
    processOne: true,
    processTwo: true,
    processThree: true,
  });

  // Return items which have been changed AND are valid
  const diffBy = (pred: Function) => (a: Paragraph[], b: Paragraph[]) =>
    a.filter((x) => !b.some((y) => pred(x, y)) && fieldsValidity.value[x.name]);

  const difference = diffBy(
    (x: Paragraph, y: Paragraph) => x._id === y._id && x.body === y.body
  );

  const changedParagraphs = computed(() =>
    difference(
      [
        intro.value,
        background.value,
        processOne.value,
        processTwo.value,
        processThree.value,
      ],
      [...dbCopy.value]
    )
  );
  const hasMadeChanges = computed<boolean>(
    () => changedParagraphs.value.length > 0
  );

  const setDBCopy = () => {
    dbCopy.value = JSON.parse(
      JSON.stringify([
        intro.value,
        background.value,
        processOne.value,
        processTwo.value,
        processThree.value,
      ])
    );
  };

  const decodeHTMLEntities = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  const initialFetch = async () => {
    loading.value = true;
    const res = await getAllParagraphs();
    if (res) {
      intro.value = res.find((x: Paragraph) => x.name === "intro") || empty;
      background.value =
        res.find((x: Paragraph) => x.name === "background") || empty;
      processOne.value =
        res.find((x: Paragraph) => x.name === "processOne") || empty;
      processTwo.value =
        res.find((x: Paragraph) => x.name === "processTwo") || empty;
      processThree.value =
        res.find((x: Paragraph) => x.name === "processThree") || empty;

      intro.value.body = decodeHTMLEntities(intro.value.body);
      background.value.body = decodeHTMLEntities(background.value.body);
      processOne.value.body = decodeHTMLEntities(processOne.value.body);
      processTwo.value.body = decodeHTMLEntities(processTwo.value.body);
      processThree.value.body = decodeHTMLEntities(intro.value.body);

      setDBCopy();

      loading.value = false;
    }
  };

  const undoChanges = () => {
    const original = JSON.parse(JSON.stringify(dbCopy.value));
    intro.value = original.find((x: Paragraph) => x.name === "intro") || empty;
    background.value =
      original.find((x: Paragraph) => x.name === "background") || empty;
    processOne.value =
      original.find((x: Paragraph) => x.name === "processOne") || empty;
    processTwo.value =
      original.find((x: Paragraph) => x.name === "processTwo") || empty;
    processThree.value =
      original.find((x: Paragraph) => x.name === "processThree") || empty;
  };

  const saveChanges = async () => {
    showSavingLoader.value = true;
    const saved = await saveParagraphs(changedParagraphs.value);
    if (saved) setDBCopy();
    showSavingLoader.value = false;
  };

  return {
    loading,
    showSavingLoader,
    intro,
    background,
    processOne,
    processTwo,
    processThree,
    fieldsValidity,
    dbCopy,
    hasMadeChanges,
    initialFetch,
    undoChanges,
    saveChanges,
  };
});
