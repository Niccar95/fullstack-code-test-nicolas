import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full min-h-20 flex items-center border-b border-b-gray-300">
      <div className="flex justify-between items-center h-full mx-auto w-full md:w-[1200px] px-4 md:px-0 py-4 md:py-0">
        <Link to="/dashboard" className="flex items-center group">
          <p className="text-xl md:text-2xl font-bold text-[#4B4A7F] group-hover:text-[#3d3a66] transition-colors">
            It
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#6B6A9F] group-hover:text-[#5d5a86] transition-colors">
            Makes
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#4B4A7F] group-hover:text-[#3d3a66] transition-colors">
            Sense
          </p>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-[#4B4A7F] font-medium hover:text-[#3d3a66] focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 rounded px-2 py-1"
          >
            Dashboard
          </Link>
          <p className="text-gray-400 px-2 py-1">Analytics</p>
          <p className="text-gray-400 px-2 py-1">Settings</p>
          <button
            onClick={userLogout}
            className="px-4 py-2 bg-[#4B4A7F] text-white rounded hover:bg-[#3d3a66] focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
          >
            Logout
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        >
          <span className="w-6 h-0.5 bg-[#4B4A7F]"></span>
          <span className="w-6 h-0.5 bg-[#4B4A7F]"></span>
          <span className="w-6 h-0.5 bg-[#4B4A7F]"></span>
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed left-0 top-0 h-1/2 w-full bg-white z-50 md:hidden flex flex-col shadow-lg">
            <div className="flex justify-between items-center h-20 p-4 border-b border-gray-300">
              <Link
                to="/dashboard"
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="text-xl font-bold text-[#4B4A7F]">It</p>
                <p className="text-xl font-bold text-[#6B6A9F]">Makes</p>
                <p className="text-xl font-bold text-[#4B4A7F]">Sense</p>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-[#4B4A7F]"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col flex-1 items-center justify-center gap-8">
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#4B4A7F] font-medium"
              >
                Dashboard
              </Link>
              <p className="text-gray-400">Analytics</p>
              <p className="text-gray-400">Settings</p>
            </div>

            <button
              onClick={userLogout}
              className="m-4 px-4 py-3 bg-[#4B4A7F] text-white rounded hover:bg-[#3d3a66] cursor-pointer"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
