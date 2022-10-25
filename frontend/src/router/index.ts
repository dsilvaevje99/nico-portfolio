import { createRouter, createWebHistory } from "vue-router";
import FilmsView from "@/views/FilmsView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "films",
      component: FilmsView,
    },
    {
      path: "/film/:slug",
      name: "film",
      // lazy-load
      component: () => import("@/views/FilmDetailsView.vue"),
    },
    {
      path: "/photography",
      name: "photography",
      // lazy-load
      component: () => import("@/views/PhotographyView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
