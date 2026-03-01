import React, { useState, useEffect, useContext } from "react"; // Added useContext
import { useNavigate, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import pptxgen from "pptxgenjs";
import { PresentationContext } from "../context/PresentationContext"; // Import Context
import api from "../api";

const Presentation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 📡 Connect to the Context
  const { currentPresentation, setCurrentPresentation } =
    useContext(PresentationContext);

  // 📡 Use Context as the single source of truth
  const slides = currentPresentation?.slides || [];
  const topic = currentPresentation?.title || "Presentation";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideImages, setSlideImages] = useState([]);
  const [theme, setTheme] = useState("classic");
  const [fetching, setFetching] = useState(!currentPresentation); // Local loading state

  // 🎓 THE DOWNLOAD LOGIC
  const downloadPPTX = () => {
    const pres = new pptxgen();
    pres.title = topic;

    const themes = {
      classic: {
        bg: "FFFFFF",
        text: "111827",
        accent: "3B82F6",
        body: "374151",
      },
      dark: { bg: "111827", text: "F9FAFB", accent: "818CF8", body: "D1D5DB" },
      corporate: {
        bg: "EFF6FF",
        text: "1E3A8A",
        accent: "2563EB",
        body: "1E40AF",
      },
      neon: { bg: "000000", text: "4ADE80", accent: "22C55E", body: "4ADE80" },
    };

    const currentTheme = themes[theme] || themes.classic;

    slides.forEach((slide, index) => {
      let pptSlide = pres.addSlide();
      pptSlide.background = { color: currentTheme.bg };

      pptSlide.addText(`Slide ${index + 1} of ${slides.length}`, {
        x: 0.5,
        y: 0.3,
        w: 3.0,
        fontSize: 10,
        bold: true,
        color: currentTheme.accent,
      });

      pptSlide.addText(slide.title, {
        x: 0.5,
        y: 0.8,
        w: 4.5,
        fontSize: 32,
        bold: true,
        color: currentTheme.text,
      });

      pptSlide.addText(slide.content.join("\n"), {
        x: 0.5,
        y: 2.2,
        w: 4.5,
        fontSize: 16,
        color: currentTheme.body,
        bullet: { type: "bullet", color: currentTheme.accent },
        lineSpacing: 28,
      });

      if (slide.imageUrl) {
        pptSlide.addImage({
          path: slide.imageUrl,
          x: 5.2,
          y: 0.5,
          w: 4.3,
          h: 4.6,
          sizing: { type: "cover", w: 4.3, h: 4.6 },
        });
      }

      if (theme === "corporate") {
        pptSlide.addShape(pres.ShapeType.rect, {
          x: 0,
          y: 0,
          w: "100%",
          h: 0.1,
          fill: { color: "2563EB" },
        });
      }
    });

    pres.writeFile({ fileName: `${topic.replace(/\s+/g, "_")}_${theme}.pptx` });
  };

  // 📡 Persistence Logic: If Context is empty (refresh), fetch from DB
  useEffect(() => {
    const fetchPresentation = async () => {
      if (!currentPresentation && id) {
        try {
          const { data } = await api.get(`/api/presentation/${id}`);
          setCurrentPresentation(data);
        } catch (error) {
          console.error("Fetch failed:", error);
        } finally {
          setFetching(false);
        }
      } else {
        setFetching(false);
      }
    };
    fetchPresentation();
  }, [id, currentPresentation, setCurrentPresentation]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!topic || slides.length === 0 || slides[0].imageUrl) return;
      try {
        setSlideImages([]);
        const { data: pexelsData } = await axios.get(
          `https://api.pexels.com/v1/search?query=${topic}&per_page=${slides.length}`,
          { headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY } },
        );
        const imageUrls = pexelsData.photos.map((photo) => photo.src.large);
        setSlideImages(imageUrls);
      } catch (error) {
        console.error("Pexels failed to fetch:", error);
      }
    };
    fetchImages();
  }, [topic, slides.length, id]);

  // Loading state handling
  if (fetching) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center text-2xl font-bold animate-pulse">
        Loading Presentation...
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return <Navigate to="/dashboard" replace />;
  }

  const slide = slides[currentSlide];
  const themeStyles = {
    classic: "bg-white text-gray-900",
    dark: "bg-gray-900 text-gray-100",
    corporate: "bg-blue-50 text-blue-900 border-t-8 border-blue-600",
    neon: "bg-black text-green-400 border border-green-500 font-mono",
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-800 flex flex-col items-center py-12 px-4">
      {/* HEADER CONTROLS */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-500 hover:text-blue-600"
          >
            ← Back
          </button>
          <h1 className="font-bold text-xl tracking-tight text-gray-900">
            Project: {topic}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={downloadPPTX}
            className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-700 transition flex items-center gap-2"
          >
            📥 Download .pptx
          </button>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 rounded-xl outline-none cursor-pointer font-medium"
          >
            <option value="classic">Classic White</option>
            <option value="dark">Tokyo Night</option>
            <option value="corporate">Executive Blue</option>
            <option value="neon">Cyber Neon</option>
          </select>
        </div>
      </div>

      {/* SLIDE CANVAS */}
      <div
        className={`w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl flex transition-all duration-700 ${themeStyles[theme]}`}
      >
        <div className="w-[45%] p-16 flex flex-col justify-center">
          <span className="text-blue-500 font-bold mb-4 uppercase tracking-widest text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <h2 className="text-5xl font-extrabold mb-10 leading-tight">
            {slide.title}
          </h2>
          <ul className="space-y-6">
            {slide.content.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 text-xl opacity-90 leading-relaxed"
              >
                <span className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[55%] relative overflow-hidden">
          {slide.imageUrl || slideImages[currentSlide] ? (
            <img
              src={slide.imageUrl || slideImages[currentSlide]}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-1000"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center animate-pulse">
              <p className="text-gray-400 font-medium">Fetching Image...</p>
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="mt-10 flex items-center gap-8">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className={`px-8 py-3 rounded-full font-bold transition ${currentSlide === 0 ? "bg-gray-200 text-gray-400" : "bg-white text-gray-700 shadow-md"}`}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))
          }
          disabled={currentSlide === slides.length - 1}
          className={`px-8 py-3 rounded-full font-bold transition ${currentSlide === slides.length - 1 ? "bg-gray-200 text-gray-400" : "bg-blue-600 text-white shadow-lg"}`}
        >
          {currentSlide === slides.length - 1 ? "Finish" : "Next Slide"}
        </button>
      </div>
    </div>
  );
};

export default Presentation;
