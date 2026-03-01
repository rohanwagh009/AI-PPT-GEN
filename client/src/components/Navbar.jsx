import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PresentationContext } from "../context/PresentationContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useContext(PresentationContext);

  // 🎓 Teacher's Tip: Check if user exists to toggle links
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // console.log("Current user in navbar: ", user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="text-white p-4 bg-black/50 backdrop-blur-md border-b border-white/10 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400 tracking-tight">
          AIPPT GEN <span className="text-white font-light"></span>
        </Link>

        <div className="flex gap-6 items-center">
          {user ? (
            /* 🎓 Show these only when Logged In */
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition text-sm"
              >
                Create
              </Link>
              <Link
                to="/history"
                className="hover:text-blue-400 transition text-sm"
              >
                My History
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm border border-red-500/50 text-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            /* 🎓 Show these only when Logged Out */
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
