<template>
  <table id="admin-films--table">
    <thead class="sr-only">
      <th>Featured?</th>
      <th>Placement</th>
      <th>Title</th>
      <th>Actions</th>
    </thead>
    <tbody id="admin-films--table-body">
      <tr
        v-for="(film, index) in store.films"
        :key="film.id"
        :id="`admin-films--row-${index}`"
      >
        <td class="width--max-content">
          <font-awesome-icon v-if="film.featured" icon="fa-solid fa-star" />
          <button
            v-else
            class="btn btn--size-small btn--icon-only"
            @click="switchFeatured(film.placement, index)"
          >
            <font-awesome-icon icon="fa-regular fa-star" />
          </button>
        </td>
        <td class="width--max-content">
          <span v-if="film.featured" id="featured-row--badge">feat</span>
          <div v-else class="flex--row flex--align-center">
            <FilmPlacementArrows
              :disable-up="index === 1"
              :disable-down="index === store.films.length - 1"
              @click="changePlacement($event, film.placement, index)"
            />
            <span>{{ film.placement }}</span>
          </div>
        </td>
        <td class="text-overflow--ellipsis" style="max-width: 0">
          {{ film.title }}
        </td>
        <td class="width--max-content">
          <button
            class="btn btn--size-small btn--icon-only admin-films--edit-btn"
          >
            <font-awesome-icon icon="fa-solid fa-pen" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { onUpdated } from "vue";
import { handleFilmDragDrop } from "@/helpers/sortingHelpers";
import { useFilmStore } from "@/stores/film";
import FilmPlacementArrows from "@/components/buttons/FilmPlacementArrows.vue";

const store = useFilmStore();

const changePlacement = (direction: number, curr: number, index: number) => {
  const filmsCopy = [...store.films];
  filmsCopy[index + direction].placement = curr;
  filmsCopy[index].placement = curr + direction;
  store.films = filmsCopy.sort(({ placement: a }, { placement: b }) => a - b);
};

const switchFeatured = (place: number, index: number) => {
  const filmsCopy = JSON.parse(JSON.stringify([...store.films]));
  const oldFeatured = filmsCopy[0];
  const newFeatured = filmsCopy[index];
  oldFeatured.placement = place;
  oldFeatured.featured = false;
  newFeatured.placement = 0;
  newFeatured.featured = true;
  store.films = store.sortFilms(filmsCopy);
};

onUpdated(() =>
  handleFilmDragDrop(document.getElementById("admin-films--table-body"))
);
</script>
