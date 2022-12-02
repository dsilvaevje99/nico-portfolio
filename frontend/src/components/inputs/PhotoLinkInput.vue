<template>
  <div
    class="input--container flex--column"
    :id="`admin-photos--${props.name}-input`"
  >
    <label
      v-if="props.label"
      :for="props.name"
      class="admin-photos--input-label"
      >{{ props.label }}</label
    >
    <div class="flex--row">
      <input
        ref="inputRef"
        :value="modelValue"
        :name="props.name"
        type="url"
        required
        placeholder="https://image-url.png"
        :class="{
          'admin-photos--input': true,
          'input--invalid-state': error,
        }"
        @input="inputChanged"
        @blur="validate"
      />
      <button
        class="btn btn--icon-only btn--filled-green admin-photos--input-btn"
        @click="$emit('submit')"
        :disabled="!!error"
      >
        <font-awesome-icon icon="fa-solid fa-check" />
      </button>
    </div>
    <p v-if="error" class="input--error-msg">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import useValidation from "@/composables/useValidation";
import { urlRules } from "@/form-rules";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "validated", "submit"]);

const { error, inputChanged, validate } = useValidation(
  emit,
  urlRules,
  true,
  props.modelValue
);

const inputRef = ref();

onMounted(() => inputRef.value?.focus());
</script>
