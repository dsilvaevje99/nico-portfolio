<template>
  <div id="film-details--container">
    <div id="film-details--player">
      <YouTube src="https://www.youtube.com/watch?v=gTxui8CJwmo" />
    </div>
    <div id="film-details--title">
      <h1>Film title</h1>
      <p>
        Film description to be shown under the movie is now shown in full so
        that the user can get more context about the film.
      </p>
    </div>
    <div id="film-details--details">
      <table>
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
    <div id="film-details--skip">
      <a class="btn btn--text-primary float-right" href="#credits">
        <font-awesome-icon icon="fa-solid fa-arrow-down" />
        Credits
      </a>
    </div>
    <div id="film-details--frames">
      <h2 class="title">Frames</h2>
      <ImageGrid :images="photos" />
    </div>
    <div id="credits">
      <h2 class="title">Credits</h2>
      <table>
        <tr>
          <td>Director</td>
          <td>Nicolás Romero</td>
        </tr>
        <tr>
          <td>Credit #2</td>
          <td>Some fellah</td>
        </tr>
        <tr>
          <td>Some dude</td>
          <td>John Doe</td>
        </tr>
        <tr>
          <td>Another dude</td>
          <td>John Cena</td>
        </tr>
        <tr>
          <td>Credit #5</td>
          <td>Lotta' Johns</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageGrid from "@/components/photo_displayers/ImageGrid.vue";
import { onBeforeMount, ref } from "vue";
import YouTube from "vue3-youtube";

const photos = ref<string[]>([
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
  "https://picsum.photos/id/0/367/267",
]);

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "dark")
);
</script>
