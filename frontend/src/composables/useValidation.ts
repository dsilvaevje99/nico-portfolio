import { ref } from "vue";

const useValidation = (
  emit: any,
  rules: Function[],
  validateOnBlur: Boolean,
  originalValue?: any
) => {
  const violatedRule = ref<number>();
  const error = ref<string>("");

  const inputChanged = (e: any) => {
    const val = e.target.value;
    emit("update:modelValue", val);
    if (!validateOnBlur) {
      validate(e);
    } else {
      // If validating on blur, still check if fixed on change
      if (violatedRule.value !== undefined) errorFixed(e, violatedRule.value);
    }
  };

  const validate = (e: any) => {
    const val = e.target.value;
    for (let rule = 0; rule < rules.length; rule++) {
      const valid = rules[rule](val);
      if (valid !== true) {
        violatedRule.value = rule;
        error.value = valid;
        break; // Break loop after first error is found
      } else {
        error.value = "";
      }
    }
    emit("validated", !error.value);
    if (!error.value && originalValue && originalValue === val) emit("submit");
  };

  const errorFixed = (e: any, rule: number) => {
    const val = e.target.value;
    const valid = rules[rule](val);
    if (valid === true) {
      violatedRule.value = undefined;
      error.value = "";
    }
    emit("validated", !error.value);
  };

  return {
    error,
    inputChanged,
    validate,
  };
};

export default useValidation;
