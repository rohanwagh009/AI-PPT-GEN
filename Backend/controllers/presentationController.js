const { GoogleGenerativeAI } = require("@google/generative-ai");
const Presentation = require("../models/Presentation");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePresentation = async (req, res) => {
  const { topic, slideCount = 5, userId } = req.body;

  if (!topic) {
    return res.status(400).json({
      message: "Topic is Required",
    });
  }

  const finalSlideCount = parseInt(slideCount, 10);

  if (finalSlideCount < 1 || finalSlideCount > 15) {
    return res.status(400).json({
      message: "Slide Count must be between 1 and 15",
    });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    const prompt = `Generate a ${finalSlideCount}-slide presentation on the topic: "${topic}".

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

    const savedPresentation = await Presentation.create({
      title: presentationData.title || `&{topic} Presentation`,
      user: userId,
      slides: presentationData.slides,
    });

    res.status(201).json(savedPresentation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "AI Generation Failed" });
  }
};

module.exports = { generatePresentation };
