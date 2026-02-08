import React from "react";
import { Link } from "react-router-dom";
// Adjust this import path if your file is named slightly differently
import { LightRays } from "../components/ui/light-rays";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 1. The Aurora Background (Fixed Layer) 
          - 'fixed inset-0': Glues it to the screen so it covers 100% of the view.
          - 'z-0': Puts it behind everything.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-start justify-center">
        <LightRays
          speed={3}
          width="100%"
          height="100%"
          className="opacity-40" // Adjust opacity: 0.4 is subtle, 0.8 is intense
        />
      </div>

      {/* 2. The Content Layer (Scrollable Layer) 
          - 'relative z-10': Puts content ON TOP of the rays.
          - 'min-h-screen': Ensures content is centered vertically.
      */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
          Generate PPTs with <span className="text-blue-500">AI</span> 🚀
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Transform your ideas into professional presentations in seconds. Just
          type a topic, and let our AI handle the rest.
        </p>

        {/* CTA Button */}
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow-lg hover:shadow-blue-500/25"
        >
          Get Started for Free
        </Link>
      </div>
    </div>
  );
};

export default Home;
