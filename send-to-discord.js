const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

const WEBHOOK = process.env.DISCORD_WEBHOOK;

app.post("/webhook", async (req, res) => {
  try {
    const response = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    res.status(response.status).send("Sent to Discord");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending webhook");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
