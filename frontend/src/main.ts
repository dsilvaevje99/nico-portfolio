import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faXmark,
  faArrowDown,
  faAt,
  faKey,
  faUser,
  faArrowRight,
  faClapperboard,
  faImage,
  faStar,
  faPen,
  faChevronUp,
  faChevronDown,
  faTrash,
  faCheck,
  faAdd,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBuilding,
  faStar as faStarOutlined,
} from "@fortawesome/free-regular-svg-icons";
import { faInstagram, faImdb } from "@fortawesome/free-brands-svg-icons";

library.add(
  faBars,
  faXmark,
  faArrowDown,
  faUser,
  faArrowRight,
  faClapperboard,
  faImage,
  faStar,
  faPen,
  faChevronUp,
  faChevronDown,
  faTrash,
  faCheck,
  faAdd,
  faEye,
  faAt,
  faBuilding,
  faStarOutlined,
  faKey,
  faInstagram,
  faImdb
);

import "./assets/main.css";
import "./assets/small-screens.css";
import "./assets/medium-screens.css";
import "./assets/big-screens.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
