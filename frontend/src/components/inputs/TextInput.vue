<template>
  <div>
    <div class="input--container" :id="`contact--${props.name}-input`">
      <label :for="props.name" class="sr-only">{{ props.label }}</label>
      <input
        :value="modelValue"
        :name="props.name"
        :type="props.type"
        :form="formId"
        :required="props.required"
        :placeholder="props.label"
        :class="{
          'input--has-icon': props.icon,
          'input--is-required': props.displayAsterix,
          'input--invalid-state': error,
        }"
        @input="inputChanged"
        @blur="validate"
      />
      <font-awesome-icon v-if="props.icon" :icon="props.icon" />
      <span
        v-if="props.required && props.displayAsterix"
        class="input--required-asterix"
        >*</span
      >
    </div>
    <p v-if="error" class="input--error-msg">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";

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
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "text",
  },
  icon: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  displayAsterix: {
    type: Boolean,
    required: false,
    default: false,
  },
  rules: {
    type: Array as () => Function[],
    required: false,
    default: () => [],
  },
  validateOnBlur: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "validated"]);

const violatedRule = ref<number>();
const error = ref<string>("");

const inputChanged = (e: any) => {
  const val = e.target.value;
  emit("update:modelValue", val);
  if (!props.validateOnBlur) {
    validate(e);
  } else {
    // If validating on blur, still check if fixed on change
    if (violatedRule.value !== undefined) errorFixed(e, violatedRule.value);
  }
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

const errorFixed = (e: any, rule: number) => {
  const val = e.target.value;
  const valid = props.rules[rule](val);
  if (valid === true) {
    violatedRule.value = undefined;
    error.value = "";
  }
  emit("validated", !error.value);
};
</script>
