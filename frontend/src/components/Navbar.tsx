import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex w-full h-[80px] border-b border-b-gray-300">
      <button onClick={userLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
