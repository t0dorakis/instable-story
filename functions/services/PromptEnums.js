const ChatPromptAdditions = {
  Initiator: `Write a screenplay for a movie on`,
  Schema: `
  {
    "title": "title of the movie",
    "mood": "visual mood and color grading of the movie",
    "scenes": [
        {
            "scene": "visual description of the scenery",
            "lighting": "lighting of the film-still",
            "camera": "camera point of view and lens information of the film-still",
            "plot": "plot of the scene",
            "characters": [
              {
                name: "name of character",
                visualDescription: "visual description of character"
              }
            ]
        },
    ]
  }`,
  Instructions: `
    At first, list all contained characters and their visual characteristics.
    Secondly, summarise the overall cinematographic mood and color-grading in a couple of keywords.
    After this output the screenplay without dialogue in a sequence of scenes.

    Everything shall be in JSON format without trailing commas, following the schema:
    \n
  `,
};

module.exports = { ChatPromptAdditions };
