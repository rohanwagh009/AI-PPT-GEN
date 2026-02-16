import React,{useState} from "react";
import { useLocation, Navigate } from "react-router-dom";

const Presentation = () => {
  const location = useLocation();

  // Unpack the suitcase!
  const slides = location.state?.slides;
  const topic = location.state?.topic;

  const [currentSlide, setCurrentSlide] = useState(0);

  // The Bouncer: If they try to type /presentation in the URL without slides, kick them out!
  if (!slides || slides.length === 0) {
    return <Navigate to="/dashboard" replace />;
  }

  const slide = slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
      {/* Show the title of the CURRENT slide */}
      <h1 className="text-4xl font-bold mb-8 text-blue-400">{slide.title}</h1>

      {/* The Controls */}
      <div className="flex gap-4">
        <button onClick={prevSlide} className="px-4 py-2 bg-gray-600 rounded">
          Previous
        </button>
        <button onClick={nextSlide} className="px-4 py-2 bg-blue-600 rounded">
          Next
        </button>
      </div>

      <p className="mt-4">You are on slide index: {currentSlide}</p>
    </div>
  );
};

export default Presentation;
