<template>
  <div id="about--container">
    <h1 class="title">About</h1>
    <div id="about--profile-pic">
      <div class="img-container--square">
        <img
          class="img--square"
          src="https://picsum.photos/id/0/367/267"
          alt=""
        />
      </div>
    </div>
    <section id="about--intro-section">
      <p>
        Yup, that’s me. You’re probably wondering how I got into this
        situation... Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f.
        Qiufaf, asufbpoas afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf. Yup,
        that’s me. You’re probably wondering how I got into this situation...
        Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f. Qiufaf,
        asufbpoas afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf.
      </p>
      <a class="btn btn--text-primary" href="#contact">
        <font-awesome-icon icon="fa-solid fa-arrow-down" />
        Contact
      </a>
    </section>
    <h2 class="title" id="about--title-background">Background</h2>
    <section id="about--background-section">
      <p>
        Yup, that’s me. You’re probably wondering how I got into this
        situation... Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f.
        Qiufaf, asufbpoas afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf.
      </p>
    </section>
    <h2 class="title" id="about--title-process">Process</h2>
    <section id="about--process-section">
      <p id="process--p1">
        Yup, that’s me. You’re probably wondering how I got into this
        situation... Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f.
        Qiufaf, asufbpoas afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf.
      </p>
      <div class="img-container--square" id="process--img1">
        <img
          class="img--square"
          src="https://picsum.photos/id/0/367/267"
          alt=""
        />
      </div>
      <div class="img-container--square" id="process--img2">
        <img
          class="img--square"
          src="https://picsum.photos/id/0/367/267"
          alt=""
        />
      </div>
      <p id="process--p2">
        Yup, that’s me. You’re probably wondering how I got into this
        situation... Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f.
        Qiufaf, asufbpoas afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf.
      </p>
      <p id="process--p3">
        Yup, that’s me. You’re probably wondering how I got into this
        situation... Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f.
        Qiufaf, asufbpoas afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf. Yup,
        that’s me. You’re probably wondering how I got into this situation...
        Dsakdjn asdkj ns adjna.s, fopnaop3fnfka l skalf a lak f. Qiufaf,
        asufbpoas afskj nkasnf mf. ams, jan lk amm.dffma.kw fmf.
      </p>
      <div class="img-container--square" id="process--img3">
        <img
          class="img--square"
          src="https://picsum.photos/id/0/367/267"
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

onBeforeMount(() =>
  document.documentElement.setAttribute("data-theme", "light")
);
</script>
