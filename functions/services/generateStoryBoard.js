const { generateImage } = require("./mw-open-ai");
const { generateScript } = require("./generateStoryBoardScript");
// const OneSceneReturn = require("../data.mock/storyboard.mock/OneSceneReturn.mock.json");

const generateStoryBoard = async (initialPrompt, mock = true) => {
  try {
    console.log("starting to retrieve screenplay");
    const screenPlayReturn = await generateScript(initialPrompt, mock);

    const characters = screenPlayReturn.characters;
    const scenes = screenPlayReturn.scenes;
    const mood = screenPlayReturn.mood;

    const createCharacterText = (array) => {
      return array
        .map((character) => {
          if (!character.visualDescription || !character.name) {
            return ``;
          }
          return `
      ${character.name}: ${character.visualDescription}`;
        })
        .join("\n");
    };

    const defaultStyleAddition = "film-still";

    const prompts = scenes.map((scene) => {
      // const charactersInScene = scene.characters.map((character) => {
      //   const foundCharacter = characters.find(
      //     (element) => element.name === character
      //   );
      //   return foundCharacter;
      // });

      const prompt = `${mood} ${defaultStyleAddition} of ${scene.characters.map(
        (character) => `${character.name} is a ${characters.visualDescription}`
      )} ${scene.plot} ${scene.camera} ${scene.lighting} ${scene.scene} `;
      return prompt;
    });

    const results = await Promise.all(
      prompts.map((prompt) => generateImage(prompt, 256, 1, 512, 256))
    );

    const enrichedResults = await results.map((result, index) => {
      return {
        image: result,
        prompt: prompts[index],
        plot: scenes[index].plot,
        scene: scenes[index].scene,
        camera: scenes[index].camera,
        lighting: scenes[index].lighting,
        characters: scenes[index].characters,
      };
    });
    return enrichedResults;
  } catch (err) {
    console.log(err);
  }
};

const arrayOfCharactersToString = (array) => {
  return array
    .map((character) => {
      if (!character.visualDescription || !character.name) {
        return ``;
      }
      return `
  ${character.name}: ${character.visualDescription}`;
    })
    .join(",")
    .replace(/\n|\r/g, "");
};

const generateSceneImage = async (scene, mood) => {
  // const Scene = OneSceneReturn;
  // scene = Scene;
  console.log("scene", scene);

  const characters = arrayOfCharactersToString(scene.characters);

  try {
    const defaultStyleAddition = "film-still";

    const prompt = `${scene.mood} ${defaultStyleAddition}. ${scene.plot} ${characters} ${scene.camera} ${scene.lighting} ${scene.scene} `;

    console.log("prompt", prompt);
    const result = await generateImage(prompt, 512, 1);

    const enrichedResult = {
      image: result,
      prompt: prompt,
    };

    return enrichedResult;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generateStoryBoard, generateSceneImage };
