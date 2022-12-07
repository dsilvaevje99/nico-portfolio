import { createRouter, createWebHistory } from "vue-router";
import { isLoggedIn } from "@/api/auth.api";
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
      meta: { requireAuth: false },
      component: FilmsView,
    },
    {
      path: "/film/:slug",
      name: "film",
      meta: { requireAuth: false },
      // lazy-load
      component: () => import("@/views/FilmDetailsView.vue"),
    },
    {
      path: "/photography",
      name: "photography",
      meta: { requireAuth: false },
      // lazy-load
      component: () => import("@/views/PhotographyView.vue"),
    },
    {
      path: "/about",
      name: "about",
      meta: { requireAuth: false },
      component: AboutView,
    },
    {
      path: "/login",
      name: "login",
      meta: { requireAuth: false },
      component: LoginView,
    },
    {
      path: "/admin",
      name: "admin",
      meta: { requireAuth: true },
      component: AdminView,
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      meta: { requireAuth: false },
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

router.beforeEach(async (to, from, next) => {
  // If trying to access secure page, and not logged in
  if (to.meta.requireAuth) {
    if (!(await isLoggedIn())) {
      return next({ path: "/login" });
    }
  }

  // If going to login page, but already logged in
  if (to.name === "login") {
    if (await isLoggedIn()) return next({ path: "/admin" });
  }

  return next();
});

export default router;
