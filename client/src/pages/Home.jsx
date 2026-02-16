import React from "react";
import { Link } from "react-router-dom";
import { Meteors } from "../components/ui/meteors";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 1. The Meteor Background Layer */}
      {/* 'fixed inset-0' ensures it covers the WHOLE screen, not just the top corner */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* We shift it left slightly (-ml-20) to ensure meteors falling diagonally cover the left edge too */}
        <div className="absolute top-0 left-0 w-[120%] h-full -ml-20">
          <Meteors number={40} />
        </div>
      </div>

      {/* 2. The Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
          Generate PPTs with <span className="text-blue-500">AI</span> 🚀
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Transform your ideas into professional presentations in seconds. Just
          type a topic, and let our AI handle the rest.
        </p>

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
