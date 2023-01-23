const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANISATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (
  prompt = "a white siamese cat",
  pixel = 256,
  number = 1
) => {
  console.log("Generating image with prompt: ", prompt)
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: number,
      size: `${pixel}x${pixel}`,
    });
    const image_url = response.data.data[0].url;
    return image_url;
  } catch (err) {
    console.log(err);
  }
};

const generateText = async (
  prompt = "a white siamese cat",
  config = { temperature: 1.0, max_tokens: 100, model: "text-davinci-002" }
) => {
  console.log("Generating text ...");
  try {
    const response = await openai.createCompletion({
      prompt: prompt,
      ...config,
    });
    const text = response.data.choices[0].text;
    return text;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generateImage, generateText };
