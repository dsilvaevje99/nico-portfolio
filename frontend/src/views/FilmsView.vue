<template>
  <div id="films--container">
    <h1 class="title nudge-right">Films</h1>
    <div id="featured-film--container">
      <router-link :to="`/film/${featuredFilm?.slug}`" tabindex="7">
        <img :src="featuredFilm?.thumbnail" id="featured-film--img" />
      </router-link>
      <div id="featured-film-details--container">
        <div id="featured-film-details--bg"></div>
        <div id="featured-film-details--content">
          <h2 id="featured-film--title">{{ featuredFilm?.title }}</h2>
          <p>{{ featuredFilm?.description }}</p>
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
          :to="`/film/${featuredFilm?.slug}`"
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
        v-for="(film, index) in films"
        :to="`/film/${film.slug}`"
        :key="film.id"
        :class="`film--tile-container ${
          index !== 0 && index % 8 === 0
            ? 'film--tile-big'
            : index !== 0 && index % 4 === 0
            ? 'film--tile-big film--tile-right'
            : ''
        }`"
      >
        <FilmGridTile :film="film" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, computed } from "vue";
import type { Film } from "@/../../../common-types";
import FilmGridTile from "@/components/film_displayers/FilmGridTile.vue";

const featuredFilm = computed(() => films.value.find((f) => f.featured));

const films = ref<Film[]>([
  {
    id: 0,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #1",
    slug: "film-one",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 1,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #2 with a long title to see what happens",
    slug: "film-two",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 2,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #3",
    slug: "film-three",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: true,
  },
  {
    id: 3,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #4",
    slug: "film-four",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 4,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #5",
    slug: "film-five",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 5,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #6",
    slug: "film-six",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 6,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #7",
    slug: "film-seven",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 3,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #4",
    slug: "film-four",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 4,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #5",
    slug: "film-five",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 5,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #6",
    slug: "film-six",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 6,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #7",
    slug: "film-seven",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 3,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #4",
    slug: "film-four",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 4,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #5",
    slug: "film-five",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 5,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #6",
    slug: "film-six",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 6,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #7",
    slug: "film-seven",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
]);

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "dark")
);
</script>
