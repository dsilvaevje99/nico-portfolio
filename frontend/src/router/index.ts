import { createRouter, createWebHistory } from "vue-router";
import FilmsView from "@/views/FilmsView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminView from "@/views/AdminView.vue";
import PageNotFound from "@/views/PageNotFound.vue";

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
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: PageNotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
