<template>
  <iframe v-if="videoSource" width="100%" :src="videoSource"></iframe>
  <p v-else style="padding: 10rem 0">
    <span class="title" style="display: inline-block; margin-bottom: 1rem"
      >Failed to load video source!</span
    ><br />
    <span v-if="props.src">
      You might still be able to watch it by opening the source in a new tab:
      <a :href="props.src" target="_blank">{{ props.src }}</a>
    </span>
  </p>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const videoSource = computed<string>(() => {
  if (props.src.includes("vimeo")) {
    const split = props.src.split("/");
    const id = split[split.length - 1];
    return `https://player.vimeo.com/video/${id}?portrait=0&byline=0`;
  } else if (props.src.includes("youtu.be")) {
    const split = props.src.split("/");
    const id = split[split.length - 1];
    return `https://www.youtube.com/embed/${id}?rel=0&color=white`;
  } else if (props.src.includes("youtube")) {
    const id = props.src.split(/[v=]|[&]/)[2];
    return `https://www.youtube.com/embed/${id}?rel=0&color=white`;
  } else {
    return "";
  }
});
</script>
