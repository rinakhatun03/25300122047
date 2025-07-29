const express = require("express");
const {
  createShortUrl,
  redirectUrl,
  getStats,
} = require("../controllers/urlController");
const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/shorturls/:shortcode", getStats);
router.get("/:shortcode", redirectUrl);
module.exports = router;
