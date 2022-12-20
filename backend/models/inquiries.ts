const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: false },
  body: { type: String, required: true },
  date: { type: Date, required: true },
  opened: { type: Boolean, required: true },
});

module.exports = mongoose.model("Inquiries", inquirySchema);
