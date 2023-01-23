const { config } = require("dotenv");
const { generateText } = require("./mw-open-ai");
const { ChatPromptAdditions } = require("./PromptEnums");
const { jsonrepair } = require("jsonrepair");

const generateScript = async (userPrompt, mock) => {
  const prompt = `${ChatPromptAdditions.Initiator} ${userPrompt} ${ChatPromptAdditions.Instructions} ${ChatPromptAdditions.Schema}`;
  console.log("starting script retrieve");
  try {
    const config = {
      temperature: 0.9,
      max_tokens: 3000,
      model: "text-davinci-003",
    };
    const response = await generateText(prompt, config);
    const repairedResponse = jsonrepair(response);

    return repairedResponse;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generateScript };
