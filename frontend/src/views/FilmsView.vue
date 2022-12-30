<template>
  <div v-if="loading" id="films--container">
    <div class="centered--container">
      <LoadingSpinner />
    </div>
  </div>
  <div v-else id="films--container">
    <h1 class="title nudge-right">Films</h1>
    <div id="featured-film--container">
      <router-link :to="`/film/${store.featuredFilm?.slug}`" tabindex="7">
        <img :src="store.featuredFilm?.thumbnail" id="featured-film--img" />
      </router-link>
      <div id="featured-film-details--container">
        <div id="featured-film-details--bg"></div>
        <div id="featured-film-details--content">
          <h2 id="featured-film--title" v-html="store.featuredFilm?.title"></h2>
          <p v-html="store.featuredFilm?.description"></p>
          <table id="featured-film-details--table">
            <tr>
              <td>Project type</td>
              <td>{{ store.featuredFilm?.type }}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{{ store.featuredFilm?.date }}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{{ store.featuredFilm?.location }}</td>
            </tr>
            <tr v-if="store.featuredFilm?.client">
              <td>Client</td>
              <td>{{ store.featuredFilm?.client }}</td>
            </tr>
            <tr v-if="store.featuredFilm?.company">
              <td>Production Company</td>
              <td>{{ store.featuredFilm?.company }}</td>
            </tr>
          </table>
        </div>
        <router-link
          :to="`/film/${store.featuredFilm?.slug}`"
          class="btn btn--text-primary"
          tabindex="8"
        >
          Learn more
          <font-awesome-icon class="iconRight" icon="fa-solid fa-arrow-right" />
        </router-link>
      </div>
    </div>
    <div id="films--grid">
      <router-link
        v-for="film in gridFilms"
        :to="`/film/${film.slug}`"
        :key="film._id"
        class="film--tile-container"
      >
        <FilmGridTile :film="film" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeMount } from "vue";
import FilmGridTile from "@/components/film_displayers/FilmGridTile.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useFilmStore } from "@/stores/film";
import type { Film } from "@/../../common-types";

const store = useFilmStore();

const loading = ref<Boolean>(false);
const gridFilms = computed<Film[]>(() =>
  store.films.filter((f) => !f.featured)
);

onBeforeMount(async () => {
  document.documentElement.setAttribute("data-theme", "dark");
  if (store.films.length <= 0) {
    loading.value = true;
    await store.getFilms();
    loading.value = false;
  }
});
</script>
