import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto px-4 md:max-w-[1200px]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
