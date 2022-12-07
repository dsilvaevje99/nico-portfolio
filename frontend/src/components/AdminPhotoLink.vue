<template>
  <div class="flex--column admin-photo-link--container">
    <p v-if="props.label" class="label" style="padding-bottom: 0">
      {{ props.label }}
    </p>
    <div
      class="flex--row flex--justify-between flex--align-center admin-photo--link"
    >
      <p v-if="props.type === 'hash'" class="text-overflow--ellipsis">
        {{ props.url }}
      </p>
      <a
        v-else
        :href="props.url"
        target="_blank"
        class="text-overflow--ellipsis"
        >{{ props.url }}</a
      >
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
  type: {
    type: String,
    required: false,
    default: "link",
  },
});
</script>
