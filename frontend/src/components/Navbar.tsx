import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex w-full h-20 border-b border-b-gray-300 items-center px-6">
      <button
        onClick={userLogout}
        className="px-4 py-2 bg-[#4B4A7F] text-white rounded hover:bg-[#3d3a66] focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
