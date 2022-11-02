<template>
  <div id="login--container">
    <h1 class="title nudge-right">Login</h1>
    <div id="login--form-container">
      <TheLoginForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import TheLoginForm from "@/components/forms/TheLoginForm.vue";

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "admin")
);
</script>
