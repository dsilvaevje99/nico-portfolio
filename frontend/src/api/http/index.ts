import axios from "axios";

const MODE = import.meta.env.MODE;

axios.defaults.headers.common["authorization"] = localStorage.getItem("jwt");

export const Http = {
  BaseURL: `${
    MODE === "production"
      ? "https://romero-service.onrender.com"
      : window.location.origin
  }/api`,
  Client: axios,
};
