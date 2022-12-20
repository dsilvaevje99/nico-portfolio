<template>
  <div v-if="successfullSubmit" id="contact-form--submit-msg">
    <p class="title">Message sent</p>
    <p>I will get back to you as soon as possible!</p>
  </div>
  <form v-else class="form--container" id="contact-form">
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
      name="company"
      label="Company"
      formId="contact-form"
      icon="fa-regular fa-building"
      :rules="companyRules"
      @validated="(v) => (fieldsValidity.company = v)"
    />
    <CustomTextarea
      id="inquiry--input"
      v-model="inquiry"
      name="inquiry"
      label="Inquiry"
      hideLabel
      formId="contact-form"
      required
      :maxLength="300"
      :rules="inquiryRules"
      @validated="(v) => (fieldsValidity.inquiry = v)"
    />
    <div id="contact--submit-btn">
      <button
        type="submit"
        class="btn btn--filled-primary float-right"
        :disabled="!valid"
        @click="submitInquiry"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import TextInput from "@/components/inputs/TextInput.vue";
import {
  nameRules,
  emailRules,
  companyRules,
  inquiryRules,
} from "@/form-rules";
import CustomTextarea from "../inputs/CustomTextarea.vue";
import { saveNewInquiry } from "@/api/inquiries.api";

const successfullSubmit = ref<boolean>(false);
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

const submitInquiry = async (e: any) => {
  e.preventDefault();
  const saved = await saveNewInquiry({
    _id: "",
    name: fullName.value,
    email: email.value,
    company: company.value,
    body: inquiry.value,
    date: new Date(),
    opened: false,
  });
  if (saved) {
    successfullSubmit.value = true;
  }
};
</script>
