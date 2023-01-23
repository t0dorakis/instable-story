import React from "react";

const url = "https://api.theodorhillmann.de";

const Api = {
  // TODO: add token for better security
  getScript: async (prompt) => {
    try {
      const response = await fetch(url + "/story-board-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${prompt}`,
        }),
      });
      const data = await response.json();
      const enrichedResult = splitIntoScenes(data);
      return enrichedResult;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getSceneImage: async (scene) => {
    try {
      const response = await fetch(url + "/generate-scene-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scene: scene,
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return;
    }
  },
};

const splitIntoScenes = (script) => {
  const scenes = script.scenes.map((scene, index) => {
    return {
      title: script.title,
      index: index,
      scene: scene.scene,
      plot: scene.plot,
      lighting: scene.lighting,
      camera: scene.camera,
      mood: script.mood,
      characters: scene.characters,
    };
  });
  return scenes;
};

export default Api;
