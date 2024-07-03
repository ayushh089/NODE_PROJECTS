const express = require("express");
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connect");
const app = express();
const URL = require("./models/url");
const PORT = 3000;
app.use(express.json());
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("CONNECTED"))
  .catch(() => {
    console.log("ERROR");
  });
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => {
  console.log(`Server started at PORT {PORT}`);
});
