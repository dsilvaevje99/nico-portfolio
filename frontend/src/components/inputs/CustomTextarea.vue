<template>
  <div class="input--container flex-column">
    <label :for="props.name" :class="{ 'sr-only': props.hideLabel }">{{
      props.label
    }}</label>
    <textarea
      :value="props.modelValue"
      :name="props.name"
      :form="props.formId"
      :required="props.required"
      :placeholder="props.placeholder ? props.placeholder : props.label"
      :maxlength="props.maxLength"
      @input="inputChanged"
      @blur="validate"
      :class="{
        'input--invalid-state': error,
      }"
    ></textarea>
    <div class="textarea--bottom-area">
      <button
        v-if="showClearBtn"
        class="btn btn--size-small btn--text-secondary"
        @click="clear"
      >
        Clear
      </button>
      <p v-else-if="error" class="input--error-msg">{{ error }}</p>
      <span class="textarea--counter">{{ counter }}</span>
    </div>
    <p v-if="showClearBtn && error" class="input--error-msg">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  hideLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  hideClearBtn: {
    type: Boolean,
    required: false,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  maxLength: {
    type: Number,
    required: true,
  },
  rules: {
    type: Array as () => Function[],
    required: false,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "validated"]);

const violatedRule = ref<number>();
const error = ref<string>("");
const counter = computed(
  () => `${props.modelValue.length} / ${props.maxLength}`
);
const showClearBtn = computed(
  () => !props.hideClearBtn && props.modelValue.length > 0
);

const inputChanged = (e: any) => {
  const val = e.target.value;
  emit("update:modelValue", val);
  validate(e);
};

const validate = (e: any) => {
  const val = e.target.value;
  for (let rule = 0; rule < props.rules.length; rule++) {
    const valid = props.rules[rule](val);
    if (valid !== true) {
      violatedRule.value = rule;
      error.value = valid;
      break; // Break loop after first error is found
    } else {
      error.value = "";
    }
  }
  emit("validated", !error.value);
};

const clear = () => emit("update:modelValue", "");
</script>
