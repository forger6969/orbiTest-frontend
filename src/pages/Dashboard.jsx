import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
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

const Dashboard = () => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [ userData, setData ] = useState(null);

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
            <div className="px-4" onClick={() => window.history.back()}>
              Back
            </div>
          </nav>

          {/* Page content here */}
          <div className="p-4">
            <Routes>
              <Route index element={<DashboardHome userData={userData} />} />
              <Route path="tests" element={<DashboardTests />} />
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
                                                    ${
                                                      isActive
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
                                                    ${
                                                      isActive
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-96 transform transition-all">
            {/* Modal Header */}
            <div className="bg-red-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Account</h3>
                <button
                  onClick={() => setShowAccountModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{userData?.username}</h4>
                  <p className="text-sm text-gray-500">
                   {userData?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                  <User size={20} />
                  <span>Edit Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 font-medium text-red-500 transition-colors">
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
