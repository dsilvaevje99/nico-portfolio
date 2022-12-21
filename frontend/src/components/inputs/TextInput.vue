<template>
  <div>
    <label :for="props.name" :class="{ 'sr-only': props.hideLabel }">{{
      props.label
    }}</label>
    <div class="input--container" :id="`${props.name}--input`">
      <input
        :value="modelValue"
        :name="props.name"
        :type="props.type"
        :form="formId"
        :required="props.required"
        :placeholder="props.placeholder ? props.placeholder : props.label"
        :class="{
          'input--has-icon': props.icon,
          'input--is-required': props.displayAsterix,
          'input--invalid-state': error,
          'input--dense': props.dense,
          'input--underlined': props.underlined,
          'input--bg-secondary': props.secondaryBg,
        }"
        :disabled="props.disabled"
        @input="inputChanged"
        @blur="
          (e) => {
            validate(e);
            $emit('blur');
          }
        "
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
import useValidation from "@/composables/useValidation";

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
  hideLabel: {
    type: Boolean,
    required: false,
    default: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  formId: {
    type: String,
    required: false,
    default: "",
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
  dense: {
    type: Boolean,
    required: false,
    default: false,
  },
  underlined: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  secondaryBg: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "validated", "blur"]);

const { error, inputChanged, validate } = useValidation(
  emit,
  props.rules,
  props.validateOnBlur
);
</script>
