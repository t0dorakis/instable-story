"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const https = require("https");
const serverless = require("serverless-http");
const { generateImage, generateText } = require("./services/mw-open-ai");
const {
  generateStoryBoard,
  generateSceneImage,
} = require("./services/generateStoryBoard");
const { generateScript } = require("./services/generateStoryBoardScript");
const app = express();
const router = express.Router();

// Certificate
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/api.theodorhillmann.de/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/api.theodorhillmann.de/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/api.theodorhillmann.de/fullchain.pem",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

app.use(express.json()); // middleware to parse JSON body

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

const routerBasePath = "/";

router.get("/create-image", async (req, res) => {
  console.log("create-image request", req.body);
  try {
    const { prompt, pixel, number } = req.body;
    const response = await generateImage(prompt, pixel, number);
    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/complete-text", async (req, res) => {
  console.log("complete-text request", req.body);
  try {
    const { prompt } = req.body;
    const response = await generateText(prompt);
    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/create-story-board", async (req, res) => {
  console.log("createStoryBoard request", req.body);
  try {
    const { prompt, mock = false } = req.body;
    const response = await generateStoryBoard(prompt, mock);
    res.send(response);
  } catch (err) {
    res.status;
  }
});

router.post("/story-board-script", async (req, res) => {
  console.log("story-board-script request", req.body);
  try {
    const { prompt, mock = false } = req.body;
    const response = await generateScript(prompt, mock);
    res.send(response);
  } catch (err) {
    res.status;
  }
});

router.post("/generate-scene-image", async (req, res) => {
  console.log("generate-scene-image request", req.body);
  try {
    const { scene, mood } = req.body;
    const response = await generateSceneImage(scene, mood);
    res.send(response);
  } catch (err) {
    res.status;
  }
});

router.get("/", (req, res) => {
  console.log("hallo welt");
  res.send("Hallo Welt");
});

app.use(routerBasePath, router);

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log("HTTP Server running on port 80");
});

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});

module.exports = {
  handler: serverless(app),
  app,
};
// module.exports = app;
