import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1 mx-auto p-4 md:py-4 md:px-0  w-full md:w-[1200px]">
        <Outlet />
      </main>
      <footer className="py-4 text-center border-t border-gray-200">
        footer content bla bla bla
      </footer>
    </>
  );
};

export default Layout;
