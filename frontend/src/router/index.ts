import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordName,
} from "vue-router";
import FilmsView from "@/views/FilmsView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";

const scrollPositions = Object.create(null);

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
  scrollBehavior(to, from, savedPosition) {
    const element = document.body;

    if (
      savedPosition &&
      element !== null &&
      ((to as RouteLocationNormalized).name as RouteRecordName) in
        scrollPositions
    ) {
      // If browser nav-buttons were used
      element.scrollTop =
        scrollPositions[
          (to as RouteLocationNormalized).name as RouteRecordName
        ];
    } else {
      if (to.name === from.name) {
        // SAME-PAGE: Scroll as normal
        scrollPositions[
          (to as RouteLocationNormalized).name as RouteRecordName
        ];
      } else if (to.hash) {
        // ANCHOR ON PAGE LOAD: Scroll as normal
        const anchor = document.getElementById(to.hash.substring(1));
        const position = anchor?.getBoundingClientRect();
        if (anchor && position) element.scrollTop = position.top;
      } else {
        // ROUTE CHANGED: Scroll to top right in the middle of animation, so scrolling is invisible
        setTimeout(() => {
          document.body.style.scrollBehavior = "initial";
          element.scrollTop = 0;
          document.body.style.scrollBehavior = "smooth";
        }, 249);
      }
    }
  },
});

router.beforeEach((to, from, next) => {
  const element = document.body;
  if (element !== null) {
    scrollPositions[(from as RouteLocationNormalized).name as RouteRecordName] =
      element.scrollTop;
  }

  next();
});

export default router;
