const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const { generateImage, generateText } = require("./services/mw-open-ai");
const {
  generateStoryBoard,
  generateSceneImage,
} = require("./services/generateStoryBoard");
const { generateScript } = require("./services/generateStoryBoardScript");

const app = express();
// app.use(express.json()); // middleware to parse JSON body
const routerBasePath = "/.netlify/functions/test";

const router = express.Router();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

console.log("test request");
router.get("/", async (req, res) => {
  console.log("test request", req.body);
  try {
    res.send({ message: "Hello World" });
  } catch (err) {
    res.status;
  }
});
app.use(routerBasePath, router);

module.exports.handler = serverless(app);

// exports.handler = async function (event, context) {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: "Hello World" }),
//   };
// };
