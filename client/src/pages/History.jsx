import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PresentationContext } from "../context/PresentationContext";

const History = () => {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState([]);

  // 📡 Connect to the Radio Tower
  const { setCurrentPresentation } = useContext(PresentationContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const userId = user?._id || user?.id;

        if (userId) {
          const { data } = await axios.get(
            `http://localhost:5000/api/presentation/history/${userId}`,
          );
          setPresentations(data);
        }
      } catch (error) {
        console.error("Failed to fetch history: ", error);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (e, id) => {
    // ✋ Stops the card click from firing
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this presentation?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/presentation/${id}`);

      // 🪄 Update UI instantly
      setPresentations((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete: ", error);
      alert("Could not delete the presentation. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mt-12 mb-8 border-b border-neutral-800 pb-4">
          My Presentations
        </h1>

        {presentations.length === 0 ? (
          <div className="text-center py-20 bg-neutral-800 rounded-2xl border border-dashed border-neutral-700">
            <p className="text-neutral-400">
              No history found. Start by creating your first presentation!
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 text-blue-500 hover:underline"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentations.map((presentation) => {
              return (
                <div
                  key={presentation._id}
                  onClick={() => {
                    setCurrentPresentation(presentation);
                    navigate(`/presentation/${presentation._id}`);
                  }}
                  // 🚨 Added 'relative' so the button stays inside the card
                  className="relative bg-neutral-800 border border-neutral-700 rounded-xl p-6 cursor-pointer 
                             hover:border-blue-500 hover:bg-neutral-750 transition-all duration-300 
                             group shadow-lg"
                >
                  {/* 🗑️ VISIBLE DELETE BUTTON */}
                  <button
                    onClick={(e) => handleDelete(e, presentation._id)}
                    // 🚨 absolute, z-index, and bright colors for visibility
                    className="absolute top-4 right-4 z-30 p-2 bg-red-500/10 text-red-500 
                               hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 mt-35"
                    title="Delete Presentation"
                  >
                    <span className="text-lg leading-none">🗑️</span>
                  </button>

                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-600/10 rounded-lg">📄</div>
                    <span className="text-xs text-neutral-500 bg-neutral-900 px-2 py-1 rounded">
                      {new Date(presentation.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold group-hover:text-blue-400 transition pr-8">
                    {presentation.title || "Untitled Presentation"}
                  </h2>

                  <div className="mt-4 flex items-center text-sm text-neutral-400">
                    <span className="mr-2">📊</span>
                    {presentation.slides?.length || 0} Slides
                  </div>

                  <div className="mt-6 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Slides →
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
