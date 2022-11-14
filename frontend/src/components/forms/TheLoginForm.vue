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
    <div>
      <button
        type="submit"
        class="btn btn--filled-primary float-right"
        :disabled="!valid"
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

const username = ref<string>("");
const password = ref<string>("");
const fieldsValidity = ref({
  username: true,
  password: true,
});
const valid = computed<Boolean>(
  () => !JSON.stringify(fieldsValidity.value).includes("false")
);
</script>
