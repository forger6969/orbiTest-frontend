import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  Home,
  Book,
  Headphones,
  PenTool,
  X,
  User,
  Settings,
  LogOut,
  ClipboardCheck,
} from "lucide-react";
import logo from "../assets/logo.svg";
import DashboardHome from "./DashboardHome";
import DashboardTests from "./DashboardTests";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Profil from "./Profil";

const Dashboard = () => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [userData, setData] = useState(null);
  const navigate = useNavigate()

  const getMe = async () => {

    try {
      const token = localStorage.getItem("token");
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = req.data.user;
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  let clearn = () => {
    localStorage.clear()
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full border-b-2 border-gray-200">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
              Back
            </div>
          </nav>

          {/* Page content here */}
          <div className="p-4">
            <Routes>
              <Route index element={<DashboardHome userData={userData} />} />
              <Route path="tests" element={<DashboardTests />} />
              <Route path="profil" element={<Profil />} />
            </Routes>
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side border-r-2 border-gray-200">
          <div className="w-80 min-h-full   flex flex-col">
            {/* Header */}
            <div className="p-6 flex items-center justify-center ">
              <div className="flex justify-center items-center ">
                <img src={logo} alt="" />
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex p-4 space-y-2 overflow-y-auto flex-col gap-1">
              <NavLink
                end
                className={({
                  isActive,
                }) => `w-full flex items-center gap-4 px-5 py-4 rounded
                                                    transition-all duration-300 cursor-pointer
                                                    ${isActive
                    ? `
                                                        bg-qizil1
                                                        text-white
                                                        shadow-xl
                                                        scale-105
                                                        `
                    : `
                                                        bg-transparent
                                                        text-gray-700
                                                        shadow-none
                                                        active:text-white
                                                        active:shadow-xl
                                                        active:scale-105
                                                        `
                  }
                                                    active:scale-95
                                                    `}
                to="/dashboard"
              >
                <button className="flex items-center gap-6">
                  <Home size={24} />
                  <span className={`font-semibold text-base`}>Homepage</span>
                </button>
              </NavLink>

              <NavLink
                className={({
                  isActive,
                }) => `w-full flex items-center gap-4 px-5 py-4 rounded
                                                    transition-all duration-300 cursor-pointer
                                                    ${isActive
                    ? `
                                                        bg-qizil1
                                                        text-white
                                                        shadow-xl
                                                        scale-105
                                                        `
                    : `
                                                        bg-transparent
                                                        text-gray-700
                                                        shadow-none
                                                        active:bg-red-500
                                                        active:text-white
                                                        active:shadow-xl
                                                        active:scale-105
                                                        `
                  }
                                                    active:scale-95
                                                    `}
                to="/dashboard/tests"
              >
                <button className="flex items-center gap-6">
                  <ClipboardCheck size={24} />
                  <span className={`font-semibold text-base`}>Tests</span>
                </button>
              </NavLink>
            </nav>

            {/* Account Section */}
            <div className="px-2 absolute bottom-2 pb-0">
              <button
                onClick={() => setShowAccountModal(true)}
                className="w-75 flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                <div className="w-12 h-12 bg-qizil1 rounded-full flex items-center justify-center  text-white font-bold text-lg shadow-md">
                  {userData?.username[0]}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">{userData?.username}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData?.email}
                  </p>
                </div>

              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Modal */}
      {showAccountModal && (
        <div
          onClick={() => setShowAccountModal(false)}
          className="fixed inset-0 z-50 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-22 left-3.5 w-72 bg-white
                 rounded-2xl shadow-2xl
                 animate-fadeUp "
          >
            {/* Header */}
            <div className="flex items-center gap-4 p-5 rounded-t-2xl
                      bg-gradient-to-br from-qizil1/90 to-qizil1 ">
              <div className="w-14 h-14 rounded-full bg-white/15
                        flex items-center justify-center
                        text-white font-bold text-xl ring-2 ring-white/30">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  {userData?.username}
                </h4>
                <p className="text-xs text-white/80">
                  {userData?.email}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-1">

              <Link to="/Dashboard/profil">
                <button className="menu-btn">
                  <User size={18} />

                  Edit Profile
                </button>
              </Link>


              <button className="menu-btn">
                <Settings size={18} />
                Settings
              </button>


              <Link to={"/"}>
                <button onClick={clearn} className="menu-btn text-qizil1 hover:bg-qizil1/10">
                  <LogOut size={18} />
                  Log Out
                </button>
              </Link>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
