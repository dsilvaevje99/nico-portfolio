<template>
  <h1 class="title">About</h1>
  <section id="about--intro-section">
    <div class="width--smaller">
      <div class="img-container--square">
        <img
          class="img--square"
          src="https://picsum.photos/id/0/367/267"
          alt=""
        />
      </div>
    </div>
    <div>
      <p>
        Yup, that’s me. You’re probably wondering how I got into this
        situation... Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f.
        Qiufaf, asufbpoas afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf.
      </p>
      <a class="btn btn--text-primary float-right" href="#about--contact-title">
        <font-awesome-icon icon="fa-solid fa-arrow-down" />
        Contact
      </a>
    </div>
  </section>
  <h2 class="title">Background</h2>
  <section id="about--background-section">
    <p>
      Yup, that’s me. You’re probably wondering how I got into this situation...
      Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f. Qiufaf, asufbpoas
      afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf.
    </p>
  </section>
  <h2 class="title">Process</h2>
  <section id="about--process-section"></section>
  <h2 class="title">Gallery</h2>
  <section id="about--gallery-section">
    <ImageCarousel />
  </section>
  <h2 class="title" id="about--contact-title">Contact</h2>
  <section id="about--contact-section">
    <TheContactForm />
  </section>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import ImageCarousel from "@/components/photo_displayers/ImageCarousel.vue";
import TheContactForm from "@/components/TheContactForm.vue";

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "light")
);
</script>
