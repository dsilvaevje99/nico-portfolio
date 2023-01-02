<template>
  <div class="input--container flex--column" id="contact--inquiry-input">
    <label for="inquiry" class="sr-only">Reason for inquiry</label>
    <textarea
      :value="props.modelValue"
      name="inquiry"
      form="contact-form"
      required
      placeholder="Reason for inquiry..."
      :maxlength="maxLength"
      @input="inputChanged"
      @blur="validate"
      :class="{
        'input--invalid-state': error,
      }"
    ></textarea>
    <div id="inquiry--bottom-area">
      <button
        v-if="showClearBtn"
        class="btn btn--size-small btn--text-secondary"
        @click="clear"
      >
        Clear
      </button>
      <span id="inquiry--counter">{{ counter }}</span>
    </div>
    <p v-if="error" class="input--error-msg">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { inquiryRules } from "@/form-rules";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "validated"]);

const violatedRule = ref<number>();
const error = ref<string>("");
const maxLength = ref<number>(300);
const counter = computed(
  () => `${props.modelValue.length} / ${maxLength.value}`
);
const showClearBtn = computed(() => props.modelValue.length > 0);

const inputChanged = (e: any) => {
  const val = e.target.value;
  emit("update:modelValue", val);
  validate(e);
};

const validate = (e: any) => {
  const val = e.target.value;
  for (let rule = 0; rule < inquiryRules.length; rule++) {
    const valid = inquiryRules[rule](val);
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
