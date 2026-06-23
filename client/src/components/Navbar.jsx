import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { toast } from "react-toastify";

const Navbar = ({ token, user_name }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    toast.success("Logged Out Successfully");

    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 1000);
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Workouts",
      path: "/workouts",
    },
    {
      name: "Progress",
      path: "/progress",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/Logo.png"
            alt="TrackFit"
            className="w-12 h-12 rounded-xl shadow-lg shadow-blue-500/20"
          />

          <div>
            <h1 className="text-white text-xl font-bold">
              TrackFit
            </h1>

            <p className="text-xs text-gray-400 hidden sm:block">
              Train • Track • Transform
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        {token && (
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-xl transition-all ${location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-3 md:px-4 py-2 rounded-xl border border-slate-600 text-white hover:bg-slate-800 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-3 md:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              {/* Desktop User */}
              <div className="hidden md:flex items-center gap-3 bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <FaUserCircle size={22} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Welcome back
                  </p>

                  <p className="font-semibold text-white">
                    {user_name || "User"}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="hidden md:block px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              >
                Logout
              </button>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden text-white text-3xl"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <HiX /> : <HiMenu />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && token && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">

          {/* User Info */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <FaUserCircle size={24} />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Logged in as
                </p>

                <p className="text-white font-semibold">
                  {user_name || "User"}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="p-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all ${location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="p-3">
            <button
              onClick={logout}
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;