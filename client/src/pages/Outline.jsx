import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { PresentationContext } from "../context/PresentationContext";
import api from '../api';



const Outline = () => {
  const navigate = useNavigate();

  const { topic, slideCount, slides, setSlides, setCurrentPresentation } =
    useContext(PresentationContext);

  const [isLoading, setIsLoading] = useState(slides.length === 0);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!topic) {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    if (slides && slides.length > 0) {
      return;
    }

    const fetchOutline = async () => {
      try {
        const storageData = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(storageData);
        const currentUserId = userInfo?._id;

        const { data } = await api.post(
          "/api/presentation/generate",
          { topic, slideCount, userId: currentUserId },
        );

        setSlides(data.slides);
        setIsLoading(false);
      } catch (error) {
        console.log("AI Generation failed: ", error);
        setIsLoading(false);
        alert("Something went wrong");
      }
    };
    fetchOutline();
  }, [topic, slideCount]);

  // 🎓 THE PERSISTENCE ENGINE: Fetches images AND saves to DB
  const handleGenerateFinalSlides = async () => {
    setIsGenerating(true);
    try {
      const storageData = localStorage.getItem("userInfo");
      const userId = JSON.parse(storageData)?._id;

      // 1. Fetch images for each slide
      const updatedSlides = await Promise.all(
        slides.map(async (slide) => {
          const query = slide.imagePrompt || topic;
          const response = await axios.get(
            `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
            {
              headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
            },
          );
          const pexelsUrl = response.data.photos[0]?.src?.large || "";
          return { ...slide, imageUrl: pexelsUrl };
        }),
      );

      // 2. 🎓 SAVE TO DB: Call the new save route
      const { data: savedData } = await api.post(
        "/api/presentation/save",
        { title: topic, slides: updatedSlides, userId: userId },
      );

      setCurrentPresentation(savedData);

      // 3. Navigate to viewer using the saved DB object
      navigate(`/presentation/${savedData._id}`);
    } catch (error) {
      console.error("Error in final generation:", error);
      alert("Failed to save presentation with images.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTitleEdit = (index, newTitle) => {
    const updatedSlides = [...slides];
    updatedSlides[index].title = newTitle;
    setSlides(updatedSlides);
  };

  const handlePointEdit = (slideIndex, pointIndex, newValue) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].content[pointIndex] = newValue;
    setSlides(updatedSlides);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <h2 className="text-3xl font-bold animate-pulse text-blue-500">
          AI is thinking... 🧠
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-14 mb-8">
        Outline for: <span className="text-blue-500">{topic}</span>
      </h1>

      <div className="w-full max-w-2xl">
        {slides.map((slide, sIdx) => (
          <div
            key={sIdx}
            className="bg-white/10 border border-white/20 p-6 my-4 rounded-xl text-left shadow-xl"
          >
            {/* Editable Title */}
            <input
              type="text"
              value={slide.title}
              onChange={(e) => handleTitleEdit(sIdx, e.target.value)}
              className="text-2xl font-bold bg-transparent border-b border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none w-full transition-all text-white mb-4"
            />

            <div className="space-y-3">
              {slide.content.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-3 group">
                  <span className="text-blue-500 mt-1">•</span>
                  {/* Editable Bullet Point */}
                  <textarea
                    value={point}
                    onChange={(e) =>
                      handlePointEdit(sIdx, pIdx, e.target.value)
                    }
                    rows={1}
                    className="w-full bg-transparent text-neutral-300 border-b border-transparent hover:border-white/20 focus:border-blue-500 focus:bg-white/5 p-1 rounded transition-all outline-none resize-none leading-relaxed"
                    // 🎓 This makes the textarea grow as you type
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={isGenerating}
        onClick={handleGenerateFinalSlides}
        className={`mt-10 mb-20 px-8 py-4 rounded-full font-bold text-lg transition ${
          isGenerating
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isGenerating
          ? "Saving with Images... 🖼️"
          : "Outline Looks Good ➔ Generate Slides"}
      </button>
    </div>
  );
};

export default Outline;
