import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1 mx-auto px-4 py-6 md:py-8 md:px-0 w-full md:w-[1200px]">
        <Outlet />
      </main>
      <footer className="py-8 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto w-full md:w-[1200px] px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-[#4B4A7F] mb-3">ItMakesSense</h3>
              <p className="text-gray-600 text-sm">Monitor and manage your sensors with ease.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2 items-center md:items-start">
                <Link to="/dashboard" className="text-gray-600 hover:text-[#4B4A7F] text-sm transition-colors">
                  Dashboard
                </Link>
                <p className="text-gray-400 text-sm">Analytics</p>
                <p className="text-gray-400 text-sm">Settings</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Resources</h4>
              <div className="flex flex-col gap-2 items-center md:items-start">
                <p className="text-gray-400 text-sm">Documentation</p>
                <p className="text-gray-400 text-sm">API Reference</p>
                <p className="text-gray-400 text-sm">Support</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">&copy; 2087 ItMakesSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
