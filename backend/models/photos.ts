import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  photoPageAlbum: { type: String, required: true },
  profilePic: { type: String, required: true },
  processOne: { type: String, required: true },
  processTwo: { type: String, required: true },
  processThree: { type: String, required: true },
  carouselAlbum: { type: String, required: true },
});

module.exports = mongoose.model("Photos", photoSchema);
