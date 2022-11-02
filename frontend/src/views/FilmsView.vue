<template>
  <div id="films--container">
    <h1 class="title">Films</h1>
    <div id="films--grid">
      <router-link
        v-for="(film, index) in films"
        :to="`/film/${film.slug}`"
        :key="film.id"
        style="display: contents"
      >
        <FilmGridTile :film="film" :nr="index" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import type { Film } from "@/../../../common-types";
import FilmGridTile from "@/components/film_displayers/FilmGridTile.vue";

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
