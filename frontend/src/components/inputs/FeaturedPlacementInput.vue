<template>
  <div class="flex--row" style="gap: 1rem">
    <div class="flex--column" style="flex: 1">
      <label for="featured">Featured</label>
      <div
        class="flex--row flex--align-center"
        id="featured--input"
        style="flex: 1; gap: 1rem"
      >
        <div>
          <input
            v-model="featured"
            :value="true"
            type="radio"
            name="featured"
            id="featured--input-yes"
            :disabled="disableInputs"
          />
          <label for="featured--input-yes">Yes</label>
        </div>
        <div>
          <input
            v-model="featured"
            :value="false"
            type="radio"
            name="featured"
            id="featured--input-no"
            :disabled="disableInputs"
          />
          <label for="featured--input-no">No</label>
        </div>
      </div>
    </div>
    <div v-if="!featured">
      <TextInput
        v-model.number="placement"
        type="number"
        name="placement"
        label="Placement"
        :hideLabel="false"
        formId="film-modal--form"
        required
        displayAsterix
        validateOnBlur
        :disabled="disableInputs"
        :rules="[
            (x: number) => x > 0 || 'Placement must be 1 or higher',
            (x: number) => x <= maxPlacement || `Placement must be ${maxPlacement} or lower`
        ]"
        @validated="(v) => (valid = v)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import TextInput from "@/components/inputs/TextInput.vue";
import { useFilmStore } from "@/stores/film";

const emit = defineEmits(["input", "validated"]);
const props = defineProps({
  currentVal: {
    type: Object as () => { featured: boolean; placement: number },
    required: true,
  },
});

const store = useFilmStore();

const featured = ref<boolean>(false);
const placement = ref<number>(1);
const valid = ref<boolean>(true);
const maxPlacement = computed(() => store.films.length);
const disableInputs = computed<boolean>(() => store.films.length === 1);

watch(
  [featured, placement],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ([newFeatured, newPlace], [oldFeatured, oldPlace]) => {
    let emittedPlacement = placement.value;
    if (!oldFeatured && newFeatured) {
      emittedPlacement = 0;
    } else if (oldFeatured && !newFeatured) {
      emittedPlacement = placement.value;
    }
    emit("input", { featured: featured.value, placement: emittedPlacement });
  }
);
watch(valid, () => emit("validated", valid.value));

onMounted(() => {
  if (props.currentVal) {
    featured.value = props.currentVal.featured;
    placement.value = props.currentVal.placement;
  }
});
</script>
