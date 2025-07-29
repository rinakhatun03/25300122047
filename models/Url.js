const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortcode: { type: String, unique: true },
  expiry: Date,
  clicks: [
    {
      timestamp: Date,
      source: String,
      location: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Url", urlSchema);
