<template>
  <form class="flex--column" id="change-password-form">
    <TextInput
      type="password"
      v-model="current"
      name="currentPassword"
      label="Current password"
      formId="change-password-form"
      icon="fa-solid fa-key"
      required
      :rules="passwordRules"
      @validated="(v) => (fieldsValidity.current = v)"
      secondaryBg
    />
    <TextInput
      type="password"
      v-model="newPass"
      name="newPassword"
      label="New password"
      formId="change-password-form"
      icon="fa-solid fa-key"
      required
      :rules="newPasswordRules"
      @validated="(v) => (fieldsValidity.newPass = v)"
      validateOnBlur
      secondaryBg
    />
    <TextInput
      type="password"
      v-model="repeatNewPass"
      name="repeatNewPassword"
      label="Repeat new password"
      formId="change-password-form"
      icon="fa-solid fa-key"
      required
      :rules="[...newPasswordRules, (x: string) => x === newPass || 'Repeated password is not equal to new password']"
      @validated="(v) => (fieldsValidity.repeatNewPass = v)"
      validateOnBlur
      secondaryBg
    />
    <div>
      <button
        type="submit"
        class="btn btn--filled-primary"
        :disabled="!valid"
        @click="submitForm"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import TextInput from "@/components/inputs/TextInput.vue";
import { passwordRules, newPasswordRules } from "@/form-rules";
import { changePassword } from "@/api/auth.api";

const current = ref<string>("");
const newPass = ref<string>("");
const repeatNewPass = ref<string>("");
const fieldsValidity = ref({
  current: true,
  newPass: true,
  repeatNewPass: true,
});
const valid = computed<Boolean>(
  () => !JSON.stringify(fieldsValidity.value).includes("false")
);

const submitForm = async (e: any) => {
  e.preventDefault();
  if (await changePassword(current.value, newPass.value)) {
    current.value = "";
    newPass.value = "";
    repeatNewPass.value = "";
  }
};
</script>
