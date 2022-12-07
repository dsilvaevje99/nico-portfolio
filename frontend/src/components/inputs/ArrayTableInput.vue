<template>
  <div>
    <span class="label">{{ props.label }}</span>
    <table>
      <thead class="sr-only">
        <th v-for="head in props.headers" :key="head">{{ head }}</th>
        <th>Action</th>
      </thead>
      <tbody>
        <div v-if="props.items.length <= 0" style="display: contents">
          <tr>
            <td :colspan="props.headers.length">
              No Credits have been added yet
            </td>
          </tr>
        </div>
        <div v-else style="display: contents">
          <tr v-for="(item, index) in props.items" :key="JSON.stringify(item)">
            <td v-for="(val, key) in item" :key="key">{{ val }}</td>
            <td align="center">
              <button
                class="btn btn--size-small btn--icon-only"
                @click="$emit('delete', index)"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </div>
        <tr>
          <slot></slot>
          <td>
            <button
              class="btn btn--size-fluid btn--icon-only"
              :disabled="!props.valid"
              @click="$emit('add', $event)"
            >
              <font-awesome-icon icon="fa-solid fa-add" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["delete", "add"]);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  headers: {
    type: Array as () => string[],
    required: true,
  },
  valid: {
    type: Boolean,
    required: true,
  },
});
</script>
