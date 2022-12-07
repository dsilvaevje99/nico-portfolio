<template>
  <div v-if="loading" id="film-details--container">
    <div class="centered--container">
      <LoadingSpinner />
    </div>
  </div>
  <div v-else-if="film" id="film-details--container">
    <div id="film-details--player">
      <YouTube :src="film.src" />
    </div>
    <div id="film-details--title">
      <h1>{{ film.title }}</h1>
      <p>
        {{ film.description }}
      </p>
    </div>
    <div id="film-details--details">
      <table>
        <tr>
          <td>Project type</td>
          <td>{{ film.type }}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>{{ film.date }}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{{ film.location }}</td>
        </tr>
        <tr v-if="film.client">
          <td>Client</td>
          <td>{{ film.client }}</td>
        </tr>
        <tr v-if="film.company">
          <td>Production Company</td>
          <td>{{ film.company }}</td>
        </tr>
      </table>
    </div>
    <div id="film-details--skip">
      <a class="btn btn--text-primary float-right" href="#credits">
        <font-awesome-icon icon="fa-solid fa-arrow-down" />
        Credits
      </a>
    </div>
    <div v-if="film.frames.length > 0" id="film-details--frames">
      <h2 class="title">Frames</h2>
      <ImageGrid :images="film.frames" />
    </div>
    <div id="credits">
      <h2 class="title">Credits</h2>
      <table>
        <tr v-for="cred in film.credits" :key="cred.role">
          <td>{{ cred.role }}</td>
          <td>{{ cred.name }}</td>
        </tr>
      </table>
    </div>
  </div>
  <PageNotFound v-else />
</template>

<script lang="ts" setup>
import ImageGrid from "@/components/photo_displayers/ImageGrid.vue";
import { onBeforeMount, ref } from "vue";
import YouTube from "vue3-youtube";
import { useFilmStore } from "@/stores/film";
import { useRoute } from "vue-router";
import type { Film } from "@/../../common-types";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import PageNotFound from "./PageNotFound.vue";

const store = useFilmStore();
const route = useRoute();

const loading = ref<Boolean>(false);
const film = ref<Film | null>(null);

onBeforeMount(async () => {
  document.documentElement.setAttribute("data-theme", "dark");
  loading.value = true;
  film.value = await store.getFilmDetails(route.params.slug as string);
  loading.value = false;
});
</script>
