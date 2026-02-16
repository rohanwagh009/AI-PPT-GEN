import React from "react";
import { Meteors } from "../components/ui/meteors";
import { useState } from "react";
import  axios  from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormdata] = useState({
    name: "",
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
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/users/register";
      const { data } = await axios.post(url, formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("Success");
      alert("Registration Successful");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Registration Failed" + error.message);
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
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Please Enter your name here"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 mb-4"
          />
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
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
