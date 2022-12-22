<template>
  <div
    class="input--container flex--column"
    :id="`admin-photos--${props.name}-input`"
  >
    <label
      v-if="props.label"
      :for="props.name"
      class="admin-photos--input-label"
      style="padding-bottom: 0"
      >{{ props.label }}</label
    >
    <div class="flex--row">
      <input
        ref="inputRef"
        :value="modelValue"
        :name="props.name"
        :type="props.type === 'link' ? 'url' : 'string'"
        required
        :placeholder="props.placeholder"
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
import { urlRules, hashRules } from "@/form-rules";

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
  placeholder: {
    type: String,
    required: false,
    default: "https://image-url.png",
  },
  type: {
    type: String,
    required: false,
    default: "link",
  },
});

const emit = defineEmits(["update:modelValue", "validated", "submit"]);

const { error, inputChanged, validate } = useValidation(
  emit,
  props.type === "hash" ? hashRules : urlRules,
  true,
  props.modelValue
);

const inputRef = ref();

onMounted(() => inputRef.value?.focus());
</script>
