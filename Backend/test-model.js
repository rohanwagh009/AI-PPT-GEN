const API_KEY = ; // PASTE YOUR KEY INSIDE QUOTES

async function getAvailableModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("--- YOUR AVAILABLE MODELS ---");
    if (data.models) {
      data.models.forEach((model) => {
        // Only show models that support 'generateContent'
        if (model.supportedGenerationMethods.includes("generateContent")) {
          console.log(`✅ Name: ${model.name.replace("models/", "")}`);
        }
      });
    } else {
      console.log("No models found. Error:", data);
    }
    console.log("-----------------------------");
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getAvailableModels();
