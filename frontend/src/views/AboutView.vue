<template>
  <div id="about--container">
    <h1 class="title">About</h1>
    <div id="about--profile-pic">
      <div class="img-container--square">
        <img
          class="img--square"
          :src="photoStore.adminURLs.profilePic"
          alt=""
        />
      </div>
    </div>
    <section id="about--intro-section">
      <SkeletonLoader :lines="6" v-if="!paragraphStore.intro.body" />
      <p v-else v-html="paragraphStore.intro.body"></p>
      <a class="btn btn--text-primary" href="#contact">
        <font-awesome-icon icon="fa-solid fa-arrow-down" />
        Contact
      </a>
    </section>
    <h2 class="title" id="about--title-background">Background</h2>
    <section id="about--background-section">
      <SkeletonLoader :lines="4" v-if="!paragraphStore.background.body" />
      <p v-else v-html="paragraphStore.background.body"></p>
    </section>
    <h2 class="title" id="about--title-process">Process</h2>
    <section id="about--process-section">
      <SkeletonLoader
        :lines="3"
        v-if="!paragraphStore.processOne.body"
        id="process--p1"
      />
      <p v-else id="process--p1" v-html="paragraphStore.processOne.body"></p>
      <div class="img-container--square" id="process--img1">
        <img
          class="img--square"
          :src="photoStore.adminURLs.processOne"
          alt=""
        />
      </div>
      <div class="img-container--square" id="process--img2">
        <img
          class="img--square"
          :src="photoStore.adminURLs.processTwo"
          alt=""
        />
      </div>
      <SkeletonLoader
        :lines="4"
        v-if="!paragraphStore.processTwo.body"
        id="process--p2"
      />
      <p v-else id="process--p2" v-html="paragraphStore.processTwo.body"></p>
      <SkeletonLoader
        :lines="5"
        v-if="!paragraphStore.processThree.body"
        id="process--p3"
      />
      <p v-else id="process--p3" v-html="paragraphStore.processThree.body"></p>
      <div class="img-container--square" id="process--img3">
        <img
          class="img--square"
          :src="photoStore.adminURLs.processThree"
          alt=""
        />
      </div>
    </section>
    <h2 class="title" id="about--title-gallery">Gallery</h2>
    <section id="about--gallery-section">
      <ImageCarousel />
    </section>
    <h2 class="title" id="contact">Contact</h2>
    <section id="about--contact-section">
      <TheContactForm />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import ImageCarousel from "@/components/photo_displayers/ImageCarousel.vue";
import TheContactForm from "@/components/forms/TheContactForm.vue";
import { usePhotoStore } from "@/stores/photo";
import { useParagraphStore } from "@/stores/paragraphs";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const photoStore = usePhotoStore();
const paragraphStore = useParagraphStore();

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "light")
);
</script>
