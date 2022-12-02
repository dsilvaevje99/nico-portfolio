<template>
  <div
    :class="`inquiry-card--container ${
      !$props.inquiry.opened && 'inquiry-card--unopened'
    }`"
  >
    <div v-if="!props.inquiry.opened" class="inquiry-card--unopened-dot"></div>
    <div class="flex--justify-between inquiry-card--header">
      <p>
        <strong>{{ props.inquiry.name }}</strong>
      </p>
      <p class="grey">{{ date }}</p>
    </div>
    <p :class="{ 'text-overflow--ellipsis': !expanded }">
      {{ props.inquiry.body }}
    </p>
    <div v-if="expanded" class="flex--justify-end" style="gap: 1rem">
      <button class="btn btn--size-small btn--icon-only">
        <font-awesome-icon icon="fa-solid fa-eye" />
      </button>
      <button class="btn btn--size-small btn--icon-only">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </div>
    <button v-if="!expanded" class="btn btn--card-expand" @click="openMsg">
      Details <font-awesome-icon icon="fa-solid fa-chevron-down" />
    </button>
    <button v-else class="btn btn--card-expand" @click="expanded = false">
      Collapse <font-awesome-icon icon="fa-solid fa-chevron-up" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { Inquiry } from "@/../../common-types";
import { useInquiryStore } from "@/stores/inquiry";

const store = useInquiryStore();

const props = defineProps({
  inquiry: {
    type: Object as () => Inquiry,
    required: true,
  },
});

const expanded = ref<Boolean>(false);
const date = computed<string>(() => {
  const d = props.inquiry.date;
  return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
});

const openMsg = () => {
  expanded.value = true;
  if (!props.inquiry.opened) {
    store.markAsOpened(props.inquiry.id);
  }
};
</script>
