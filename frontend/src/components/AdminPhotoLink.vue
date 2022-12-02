<template>
  <div class="flex--column admin-photo-link--container">
    <p v-if="props.label">{{ props.label }}</p>
    <div
      class="flex--row flex--justify-between flex--align-center admin-photo--link"
    >
      <a :href="props.url" target="_blank" class="text-overflow--ellipsis">{{
        props.url
      }}</a>
      <button class="btn btn--size-small btn--icon-only" @click="$emit('edit')">
        <font-awesome-icon icon="fa-solid fa-pen" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["edit"]);
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
