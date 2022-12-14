<template>
  <form id="login-form">
    <TextInput
      v-model="username"
      name="username"
      label="Username"
      formId="login-form"
      icon="fa-solid fa-user"
      required
      :rules="usernameRules"
      @validated="(v) => (fieldsValidity.username = v)"
    />
    <TextInput
      type="password"
      v-model="password"
      name="password"
      label="Password"
      formId="login-form"
      icon="fa-solid fa-key"
      required
      :rules="passwordRules"
      @validated="(v) => (fieldsValidity.password = v)"
    />
    <p v-if="showError" class="input--error-msg">Invalid login credentials</p>
    <div>
      <button
        type="submit"
        class="btn btn--filled-primary float-right"
        :disabled="!valid"
        @click="submitForm"
      >
        Login
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import TextInput from "@/components/inputs/TextInput.vue";
import { usernameRules, passwordRules } from "@/form-rules";
import { login } from "@/api/auth.api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const store = useAuthStore();

const showError = ref<boolean>(false);
const username = ref<string>("");
const password = ref<string>("");
const fieldsValidity = ref({
  username: true,
  password: true,
});
const valid = computed<Boolean>(
  () => !JSON.stringify(fieldsValidity.value).includes("false")
);

const submitForm = async (e: any) => {
  e.preventDefault();
  if (await login(username.value, password.value)) {
    showError.value = false;
    store.login(username.value);
    router.replace("/admin");
  } else {
    showError.value = true;
  }
};
</script>
