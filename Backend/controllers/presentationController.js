const { GoogleGenerativeAI } = require("@google/generative-ai");
const Presentation = require("../models/Presentation");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. GENERATE: Gets text from Gemini (No DB save yet)
const generatePresentation = async (req, res) => {
  const { topic, slideCount = 5, userId } = req.body;

  if (!topic) {
    return res.status(400).json({ message: "Topic is Required" });
  }

  const finalSlideCount = parseInt(slideCount, 10);
  if (finalSlideCount < 1 || finalSlideCount > 15) {
    return res
      .status(400)
      .json({ message: "Slide Count must be between 1 and 15" });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
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
          "imagePrompt": "A specific search term for Pexels",
          "slideOrder": 1
        }]
      }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json|```/g, "").trim();
    const presentationData = JSON.parse(cleanText);

    // Send to frontend for Pexels enrichment
    res.status(200).json(presentationData);
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("429")) {
      return res
        .status(429)
        .json({ message: "AI is busy. Try again in 1 min." });
    }
    res.status(500).json({ message: "AI Generation Failed" });
  }
};

// 2. SAVE: Final step after Frontend gets Pexels URLs
const savePresentation = async (req, res) => {
  try {
    const { title, slides, userId } = req.body;
    const savedPresentation = await Presentation.create({
      title: title || "Untitled Presentation",
      user: userId,
      slides,
    });
    res.status(201).json(savedPresentation);
  } catch (error) {
    console.error("Final Save Error:", error);
    res.status(500).json({ message: "Failed to save to database." });
  }
};

// 3. HISTORY: Fetches all presentations for a specific user
const getUserPresentations = async (req, res) => {
  try {
    const { userId } = req.params;
    const presentations = await Presentation.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(presentations);
  } catch (error) {
    console.error("Fetch history error:", error);
    res.status(500).json({ message: "Server error: Could not fetch history." });
  }
};

const deletePresentation = async (req, res) => {
  try {
    const { id } = req.params; // we get id from thr url
    const deletedPresentation = await Presentation.findByIdAndDelete(id);

    if (!deletedPresentation) {
      return res.status(404).json({ message: "Presentation not found" });
    }

    res.status(200).json({ message: "Presentation deleted successfully" });
  } catch (error) {
    console.error("Delete error: ", error);
    res
      .status(500)
      .json({ message: "Server error: Could not delete Presentation" });
  }
};

// 🎓 ALL THREE exported correctly now
module.exports = {
  generatePresentation,
  savePresentation,
  getUserPresentations,
  deletePresentation,
};
