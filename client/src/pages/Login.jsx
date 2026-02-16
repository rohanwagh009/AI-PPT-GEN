import React from "react";
import { Meteors } from "../components/ui/meteors";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page refresh
    try {
      const url = "http://localhost:5000/api/users/login";
      const { data } = await axios.post(url, formData);

      // 1. Save Token/User info
      localStorage.setItem("userInfo", JSON.stringify(data));

      console.log("Login Success!");
      alert("Login Successful");

      // 2. Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(
        "Login Failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 flex justify-center items-center overflow-hidden relative">
      {/* 1. Background Layer 
          - We wrap Meteors in a container so they stay behind everything.
      */}
      <div className="absolute inset-0 h-full w-full">
        <Meteors number={20} />
      </div>

      {/* 2. The Glass Card 
          - relative z-10: Puts this ON TOP of the meteors.
          - w-full max-w-md: Limits width so it looks like a card, not a banner.
          - p-10: Adds breathing room inside the card.
          - rounded-xl: Smooths the corners.
          - border: Adds the 1px stroke (crucial!).
      */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-10 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Please Enter your email here"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 mb-4"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Please Enter your password here"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition mb-3"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 transition font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
