import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRef } from "react";
import UserProfileCard from "../card/UserProfileCard";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const path = location.pathname;

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTitle = (path) => {
    if (path === "/") return "Dashboard";
    if (path.startsWith("/projects/")) return "Project Detail";
    if (path.startsWith("/projects")) return "Projects";
    return path.replace("/", "").replace(/-/g, " ").toUpperCase();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {user && <Sidebar userRole="SupplyChain" />}

      <main className="flex-1 overflow-y-auto h-full">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center justify-between border-b pb-2">
              <p className="text-sm text-gray-600">{getTitle(path)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <BellIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                <div className="relative" ref={wrapperRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      JD
                    </div>
                  </button>

                  {open && <UserProfileCard />}
                </div>
              </div>
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
