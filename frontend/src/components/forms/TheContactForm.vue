<template>
  <form class="form--container" id="contact-form">
    <TextInput
      v-model="fullName"
      name="fullName"
      label="Full name"
      formId="contact-form"
      icon="fa-solid fa-user"
      required
      displayAsterix
      :rules="nameRules"
      @validated="(v) => (fieldsValidity.name = v)"
    />
    <TextInput
      v-model="email"
      type="email"
      name="email"
      label="Email"
      formId="contact-form"
      icon="fa-solid fa-at"
      required
      displayAsterix
      :rules="emailRules"
      validateOnBlur
      @validated="(v) => (fieldsValidity.email = v)"
    />
    <TextInput
      v-model="company"
      type="company"
      name="company"
      label="Company"
      formId="contact-form"
      icon="fa-regular fa-building"
      :rules="companyRules"
      @validated="(v) => (fieldsValidity.company = v)"
    />
    <TheInquiryTextarea
      v-model="inquiry"
      @validated="(v) => (fieldsValidity.inquiry = v)"
    />
    <div id="contact--submit-btn">
      <button
        type="submit"
        class="btn btn--filled-primary float-right"
        :disabled="!valid"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import TextInput from "@/components/inputs/TextInput.vue";
import TheInquiryTextarea from "@/components/inputs/TheInquiryTextarea.vue";
import { nameRules, emailRules, companyRules } from "@/form-rules";

const fullName = ref<string>("");
const email = ref<string>("");
const company = ref<string>("");
const inquiry = ref<string>("");
const fieldsValidity = ref({
  name: true,
  email: true,
  company: true,
  inquiry: true,
});
const valid = computed<Boolean>(
  () => !JSON.stringify(fieldsValidity.value).includes("false")
);
</script>
