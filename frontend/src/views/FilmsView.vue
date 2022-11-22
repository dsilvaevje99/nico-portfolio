<template>
  <div id="films--container">
    <h1 class="title nudge-right">Films</h1>
    <div id="featured-film--container">
      <router-link :to="`/film/${store.featuredFilm?.slug}`" tabindex="7">
        <img :src="store.featuredFilm?.thumbnail" id="featured-film--img" />
      </router-link>
      <div id="featured-film-details--container">
        <div id="featured-film-details--bg"></div>
        <div id="featured-film-details--content">
          <h2 id="featured-film--title">{{ store.featuredFilm?.title }}</h2>
          <p>{{ store.featuredFilm?.description }}</p>
          <table id="featured-film-details--table">
            <tr>
              <td>Project type</td>
              <td>Artistic</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>Aug. 12th 2022</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>Nice, France</td>
            </tr>
            <tr>
              <td>Client</td>
              <td>Someone</td>
            </tr>
            <tr>
              <td>Production Company</td>
              <td>Whatever</td>
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
        :key="film.id"
        class="film--tile-container"
      >
        <FilmGridTile :film="film" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from "vue";
import FilmGridTile from "@/components/film_displayers/FilmGridTile.vue";
import { useFilmStore } from "@/stores/film";
import type { Film } from "@/../../common-types";

const store = useFilmStore();

const gridFilms = computed<Film[]>(() =>
  store.films.filter((f) => !f.featured)
);

onBeforeMount(() => {
  document.documentElement.setAttribute("data-theme", "dark");
  if (store.films.length <= 0) store.getFilms();
});
</script>
