const { GoogleGenerativeAI } = require("@google/generative-ai");
const Presentation = require("../models/Presentation");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePresentation = async (req, res) => {
  const { topic, slideCount = 5 } = req.body;

  if (!topic) {
    return res.status(400).json({
      message: "Topic is Required",
    });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    const prompt = `Generate a ${slideCount}-slide presentation on the topic: "${topic}".

      Return ONLY a valid JSON object. Do not add markdown formatting like \`\`\`json.
      The Structure must be:
      {
        "title": "Presentation title",
        "slides": [
        {
        
          "title":"Slide Title",
          "content": ["Bullet point 1", "Bullet point 2"],
          "imagePrompt": "A description for an AI image generator",
          "slideOrder":1
        }]
      }
      `;

    // call the api

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // clean and parse the json

    const cleanText = text.replace(/```json|```/g, "").trim();
    const presentationData = JSON.parse(cleanText);

    // not saving to DB yet just testing

    res.status(200).json(presentationData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "AI Generation Failed" });
  }
};

module.exports = { generatePresentation };
