import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full min-h-20 flex items-center border-b border-b-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center h-full mx-auto w-full md:w-[1200px] px-4 md:px-0 py-4 md:py-0 gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-20 w-full md:w-auto">
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
          <div className="flex gap-4 md:gap-6">
            <Link
              to="/dashboard"
              className="text-[#4B4A7F] font-medium hover:text-[#3d3a66] focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 rounded px-2 py-1 text-sm md:text-base"
            >
              Dashboard
            </Link>
            <p className="text-gray-400 px-2 py-1 text-sm md:text-base">
              Analytics
            </p>
            <p className="text-gray-400 px-2 py-1 text-sm md:text-base">
              Settings
            </p>
          </div>
        </div>
        <button
          onClick={userLogout}
          className="px-4 py-2 bg-[#4B4A7F] text-white rounded hover:bg-[#3d3a66] focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer text-sm md:text-base w-full md:w-auto"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
