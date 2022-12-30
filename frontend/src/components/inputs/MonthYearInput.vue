<template>
  <div>
    <span class="label" style="padding-bottom: 0">
      <label for="month">Month</label> &
      <label for="year">Year</label>
    </span>
    <div class="flex--row">
      <div class="input--container" id="month-input--container">
        <select
          v-model="month"
          name="month"
          form="film-modal--form"
          required
          @change="emitVal"
        >
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>
      <TextInput
        v-model.number="year"
        id="year-input--container"
        type="number"
        name="year"
        label="Year"
        formId="film-modal--form"
        required
        displayAsterix
        validateOnBlur
        :rules="yearRules"
        @validated="(v) => (fieldsValidity.year = v)"
        @blur="emitVal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import TextInput from "./TextInput.vue";
import { yearRules } from "@/form-rules";

const emit = defineEmits(["input", "validated"]);
const props = defineProps({
  currentVal: {
    type: String,
    required: true,
  },
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = ref<string>(months[new Date().getMonth()]);
const year = ref<number>(new Date().getFullYear());
const fieldsValidity = ref({
  year: true,
});
const valid = computed<boolean>(
  () => !JSON.stringify(fieldsValidity.value).includes("false")
);
const fullValue = computed(() => `${month.value} ${year.value}`);

const emitVal = () => {
  if (valid.value) {
    emit("input", fullValue.value);
  }
};

watch(valid, () => {
  emit("validated", valid.value);
});

onMounted(() => {
  if (props.currentVal) {
    const split = props.currentVal.split(" ");
    month.value = split[0];
    year.value = Number(split[1]);
  }
});
</script>
