const shortid = require("shortid");
const URL = require("../models/url");
async function generateNewShortURL(req, res) {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({ error: "URL IS REQUIRED" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
  });
}
module.exports = {
  generateNewShortURL,
  handleGetAnalytics
};
