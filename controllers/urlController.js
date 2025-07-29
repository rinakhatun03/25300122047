const { error } = require("winston");
const Url = require("../models/Url");
const { v4: uuidv4 } = require("uuid");

exports.createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  let short = shortcode || uuidv4().slice(0, 6);
  const expiry = new Date(Date.now() + validity * 60000);

  try {
    const exists = await Url.findOne({ shortcode: short });
    const newUrl = new Url({ originalUrl: url, shortcode: short, expiry });
    await newUrl.save();
    res.status(201).json({
      shortLink: `https://hostname:port/${short}`,
      expiry: expiry.toISOSString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.redirectUrl = async (req, res) => {
  const { shortcode } = req.params;
  const urlEntry = await Url.findOne({ shortcode });
  if (!urlEntry) {
    return res.status(404).json({ error: "Shortcode Not Found" });
  }

  if (new Date() > new Date(urlEntry.expiry)) {
    return res.status(410).json({ error: "URL expired" });
  }

  urlEntry.clicks.push({
    timestamp: new Date(),
    source: req.headers["user-agent"],
    location: req.ip,
  });
  await urlEntry.save();
  res.redirect(urlEntry.originalUrl);
};
exports.getStats = async (req, res) => {
  const { shortcode } = req.params;
  const urlEntry = await Url.findOne({ shortcode });
  if (!urlEntry) return;
  res.status(404).json({ error: "Shortcode Not Found" });

  res.json({
    totalClicks: urlEntry.clicks.length,
    originalUrl: urlEntry.originalUrl,
    createdAt: urlEntry.createdAt,
    clicks: urlEntry.clicks,
  });
};
