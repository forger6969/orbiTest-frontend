import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  Users,
  Bell,
  ChevronDown,
  FileText,
} from "lucide-react";
import logo from "../assets/logo.svg";
import DashboardHome from "./DashboardHome";
import DashboardTests from "./DashboardTests";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Profil from "./Profil";
import MyGroup from "./MyGroup";
import { AnimatePresence, motion } from "framer-motion";
import { PiExam } from "react-icons/pi";
import Exam from "./Exam";
import { useSocket } from "../hooks/useSocket";
import MyWorks from "./MyWorks";

const Dashboard = () => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [userData, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { notifications, markAsViewed } = useSocket(userData?._id);

  const getMe = async () => {
    try {
      const token = localStorage.getItem("token");
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/user/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(req.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount = notifications.filter(
    (n) => n.status === "pending"
  ).length;

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <nav className="navbar w-full bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60 px-6 h-16">
            <div className="flex-1">
              <label
                htmlFor="my-drawer-4"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <div className="hidden lg:flex items-center gap-2 text-slate-500 font-medium">
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">
                  orbiTest / Student
                </span>
              </div>
            </div>

            <div className="flex-none gap-2">
              {/* Notifications */}
              <div className="relative mr-2">
                <button
                  onClick={() => setShowNotifModal(!showNotifModal)}
                  className="p-2.5 rounded-xl hover:bg-slate-100 transition-all relative group"
                >
                  <Bell
                    size={20}
                    className={
                      unreadCount > 0
                        ? "text-qizil1 animate-pulse"
                        : "text-slate-400"
                    }
                  />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-qizil1 rounded-full border-2 border-white shadow-sm"></span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="text-[10px] font-black bg-qizil1 text-white px-2 py-0.5 rounded-full">
                            {unreadCount} New
                          </span>
                        )}
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div
                              key={n._id}
                              onClick={() => markAsViewed(n._id)}
                              className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${n.status === "pending" ? "bg-qizil1/[0.02]" : "opacity-60"}`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.notifyType === "success" ? "bg-emerald-50 text-emerald-500" : "bg-qizil1/5 text-qizil1"}`}
                                >
                                  {n.notifyType === "success" ? (
                                    <CheckCircle size={16} />
                                  ) : (
                                    <FileText size={16} />
                                  )}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-800 leading-tight mb-1">
                                    {n.title}
                                  </p>
                                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                                    {n.text}
                                  </p>
                                  <p className="text-[9px] text-slate-300 font-bold uppercase mt-2 tracking-tighter">
                                    {new Date(n.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-10 text-center">
                            <Bell
                              size={32}
                              className="text-slate-100 mx-auto mb-3"
                            />
                            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                              No notifications
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-8 w-px bg-slate-100 mx-2"></div>

              <button
                onClick={() => setShowAccountModal(true)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all"
              >
                <div className="w-8 h-8 bg-qizil1 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-qizil1/20">
                  {userData?.username?.[0]?.toUpperCase()}
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
            </div>
          </nav>

          <main className="p-6 lg:p-10">
            <Routes>
              <Route index element={<DashboardHome userData={userData} />} />
              <Route path="tests" element={<DashboardTests />} />
              <Route path="profil" element={<Profil />} />
              <Route path="Mygroup" element={<MyGroup />} />
              <Route path="Exams" element={<Exam />} />
              <Route path="MyWorks" element={<MyWorks />} />
            </Routes>
          </main>
        </div>

        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="w-72 min-h-full bg-white border-r border-slate-200/60 flex flex-col shadow-xl shadow-slate-900/5">
            <div className="p-8 flex items-center justify-center border-b border-slate-100">
              <img src={logo} alt="orbiTest" className="w-40" />
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Main Menu
              </div>

              <NavLink
                end
                to="/dashboard"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-slate-100 text-qizil1 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
                }
              >
                <Home size={20} />
                <span className="text-sm">Homepage</span>
              </NavLink>

              <NavLink
                to="/dashboard/tests"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-slate-100 text-qizil1 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
                }
              >
                <ClipboardCheck size={20} />
                <span className="text-sm">Tests</span>
              </NavLink>

              <NavLink
                to="/dashboard/Exams"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-slate-100 text-qizil1 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
                }
              >
                <PiExam size={20} />
                <span className="text-sm">Exam</span>
              </NavLink>

              <NavLink
                to="/dashboard/MyWorks"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-slate-100 text-qizil1 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
                }
              >
                <FileText size={20} />
                <span className="text-sm">My Works</span>
              </NavLink>

              <NavLink
                to="/dashboard/Mygroup"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-slate-100 text-qizil1 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
                }
              >
                <Users size={20} />
                <span className="text-sm">My group</span>
              </NavLink>
            </nav>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => setShowAccountModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-qizil1 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {userData?.username?.[0]?.toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">
                    {userData?.username}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {userData?.email}
                  </p>
                </div>
                <Settings
                  size={16}
                  className="text-slate-300 group-hover:text-slate-600 transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAccountModal && (
          <div
            onClick={() => setShowAccountModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="p-8 bg-gradient-to-br from-qizil1 to-qizil2 text-white text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-black text-3xl border border-white/30 shadow-inner mx-auto mb-4">
                  {userData?.username?.[0]?.toUpperCase()}
                </div>
                <h4 className="font-black text-xl tracking-tight">
                  {userData?.username}
                </h4>
                <p className="text-xs text-white/70 font-bold uppercase tracking-widest">
                  {userData?.email}
                </p>
              </div>
              <div className="p-6 space-y-1">
                <Link
                  to="/Dashboard/profil"
                  onClick={() => setShowAccountModal(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-bold text-sm"
                >
                  <User size={18} />
                  Edit Profile
                </Link>
                <div className="h-px bg-slate-50 my-2"></div>
                <Link
                  to="/"
                  onClick={() => localStorage.clear()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-qizil1 hover:bg-red-50 rounded-xl transition-all font-black text-sm uppercase tracking-widest"
                >
                  <LogOut size={18} />
                  Log Out
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
