import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className=" text-white p-4 bg-black/50 backdrop-blur-md border-b border-white/10 fixed w-full top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400">
          AI PPT Gen 🚀
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/login" className="hover:text-blue-400 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
