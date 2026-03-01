import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Outline from "./pages/Outline";
import ProtectedRoute from "./components/ProtectedRoute";
import Presentation from "./pages/Presentation";
import History from "./pages/History";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/outline"
          element={
            <ProtectedRoute>
              <Outline />
            </ProtectedRoute>
          }
        />
        <Route
          path="/presentation/:id"
          element={
            <ProtectedRoute>
              <Presentation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/presentation"
          element={
            <ProtectedRoute>
              <Presentation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History/>
            </ProtectedRoute>
          }
          />
          
      </Routes>
    </div>
  );
}

export default App;
