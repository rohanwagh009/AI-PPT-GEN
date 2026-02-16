import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const Outline = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const topic = location.state?.topic;
  const slideCount = location.state?.slideCount;

  if (!topic) {
    return <Navigate to="/dashboard" replace />;
  }

  // 1. THE LOGIC ZONE (Our dummy data)
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Starts true because we're fetching immediately

  useEffect(() => {
    const fetchOutline = async () => {
      try {
        const storageData = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(storageData);

        const currentUserId = userInfo?._id;

        const { data } = await axios.post(
          "http://localhost:5000/api/presentation/generate",
          { topic: topic, slideCount: slideCount, userId: currentUserId },
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

  // 2. THE UI ZONE
  // 3. THE LOADING SCREEN
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <h2 className="text-3xl font-bold animate-pulse text-blue-500">
          AI is thinking... 🧠
        </h2>
      </div>
    );
  }

  // 4. THE REAL UI
  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-14 mb-8">
        Outline for: <span className="text-blue-500">{topic}</span>
      </h1>

      <div className="w-full max-w-2xl">
        {/* Notice we are mapping over 'slides' now, not 'dummySlides'! */}
        {slides.map((slide, index) => {
          return (
            <div
              key={index}
              className="bg-white/10 border border-white/20 p-4 my-3 rounded-lg text-left"
            >
              {/* Using the properties from your Backend Gemini prompt! */}
              <h3 className="text-xl font-semibold">{slide.title}</h3>
              <ul className="list-disc ml-5 mt-2 text-neutral-300">
                {slide.content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-yellow-400 italic">
                Suggested Image: {slide.imagePrompt}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={() =>
          navigate("/presentation", { state: { slides: slides, topic: topic } })
        }
        className="mt-10 mb-20 px-8 py-4 bg-green-600 rounded-full font-bold text-lg hover:bg-green-700 transition"
      >
        Outline Looks Good ➔ Generate Slides
      </button>
    </div>
  );
};

export default Outline;
