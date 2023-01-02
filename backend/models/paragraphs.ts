import mongoose from "mongoose";

const paragraphSchema = new mongoose.Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
});

module.exports = mongoose.model("Paragraphs", paragraphSchema);
