const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const urlRoutes = require("./routes/urlRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(logger);
app.use("/", urlRoutes);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;
