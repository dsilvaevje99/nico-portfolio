const mongoose = require("mongoose");
import type { Credit, Photo } from "../../common-types";

const filmSchema = new mongoose.Schema({
  placement: {
    type: Number,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  credits: {
    type: Array as () => Credit[],
    required: true,
  },
  framesUrl: {
    type: String,
    required: false,
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Films", filmSchema);
