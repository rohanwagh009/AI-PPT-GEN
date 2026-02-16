import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState("")

  const handleGenerate = (e) => {
    e.preventDefault();

    if (!topic) {
      return alert("Please enter a topic");
    }

    navigate("/outline", { state: { topic: topic , slideCount: slideCount || 5} });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white ">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8">
          What do you want to present?
        </h1>
        <p className="text-neutral-500 text-lg">
          Enter a topic, and our AI will generate a complete presentation
          outline for you in seconds
        </p>
        <form onSubmit={handleGenerate}>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            type="text"
            placeholder="The Future of AI"
            className="w-full mt-10 p-4 rounded-full bg-neutral-900 text-white border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            value={slideCount}
            onChange={(e) => setSlideCount(e.target.value)}
            type="number"
            min="1"
            max="15"
            placeholder="How many slides? (Default: 5)"
            className="w-full mt-4 p-4 rounded-full bg-neutral-900 text-white border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="mt-4 px-6 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition">
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
