import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRef } from "react";
import UserProfileCard from "../card/UserProfileCard";
import { getTitle } from "../../utills/functions";
import { useGet } from "../../hooks/useGet";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const path = location.pathname;
  const {data}=useGet(`auth/role/${user.role}`)

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">

      {user && <Sidebar userRole={data.roleName} />}
      <main className="flex-1 overflow-y-auto h-full">
        <header className="bg-white shadow-sm border-b">
          <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 gap-4 lg:gap-0">
            <div className="w-full lg:w-auto flex justify-between lg:justify-start items-center border-b lg:border-none pb-2 lg:pb-0">
              <p className="text-sm text-gray-600">{getTitle(path)}</p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="relative" ref={wrapperRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    AD
                  </div>
                </button>

                {open && <UserProfileCard setOpen={setOpen} userRole={data.roleName}/>}
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
