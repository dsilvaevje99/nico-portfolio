<template>
  <div class="paragraphs--container">
    <CustomTextarea
      id="admin-intro--input"
      v-model="intro"
      name="intro"
      label="Intro"
      required
      hideClearBtn
      secondaryBg
      :originalValue="originals.find((x: Paragraph) => x.name === 'intro')?.body"
      :rules="paragraphRules"
      @validated="(v) => (store.fieldsValidity.intro = v)"
    />
    <CustomTextarea
      id="admin-background--input"
      v-model="background"
      name="background"
      label="Background"
      required
      hideClearBtn
      secondaryBg
      :originalValue="originals.find((x: Paragraph) => x.name === 'background')?.body"
      :rules="paragraphRules"
      @validated="(v) => (store.fieldsValidity.background = v)"
    />
    <h6 class="title" style="padding-top: 1rem">Process section</h6>
    <CustomTextarea
      id="admin-processOne--input"
      v-model="processOne"
      name="processOne"
      label="Paragraph #1"
      required
      hideClearBtn
      secondaryBg
      :originalValue="originals.find((x: Paragraph) => x.name === 'processOne')?.body"
      :rules="paragraphRules"
      @validated="(v) => (store.fieldsValidity.processOne = v)"
    />
    <CustomTextarea
      id="admin-processTwo--input"
      v-model="processTwo"
      name="processTwo"
      label="Paragraph #2"
      required
      hideClearBtn
      secondaryBg
      :originalValue="originals.find((x: Paragraph) => x.name === 'processTwo')?.body"
      :rules="paragraphRules"
      @validated="(v) => (store.fieldsValidity.processTwo = v)"
    />
    <CustomTextarea
      id="admin-processThree--input"
      v-model="processThree"
      name="processThree"
      label="Paragraph #3"
      required
      hideClearBtn
      secondaryBg
      :originalValue="originals.find((x: Paragraph) => x.name === 'processThree')?.body"
      :rules="paragraphRules"
      @validated="(v) => (store.fieldsValidity.processThree = v)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import CustomTextarea from "@/components/inputs/CustomTextarea.vue";
import { paragraphRules } from "@/form-rules";
import { useParagraphStore } from "@/stores/paragraphs";
import type { Paragraph } from "../../../common-types";

const store = useParagraphStore();

const originals = computed(() => JSON.parse(JSON.stringify(store.dbCopy)));
const intro = computed({
  get: () => store.intro.body,
  set: (value: string) => (store.intro.body = value),
});
const background = computed({
  get: () => store.background.body,
  set: (value: string) => (store.background.body = value),
});
const processOne = computed({
  get: () => store.processOne.body,
  set: (value: string) => (store.processOne.body = value),
});
const processTwo = computed({
  get: () => store.processTwo.body,
  set: (value: string) => (store.processTwo.body = value),
});
const processThree = computed({
  get: () => store.processThree.body,
  set: (value: string) => (store.processThree.body = value),
});
</script>
