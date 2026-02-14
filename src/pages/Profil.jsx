import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Heart,
  Settings,
  Edit2,
  ChevronRight,
  Shield,
  Activity,
  FileText,
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const Profil = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/user/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(req.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="h-48 bg-white rounded-2xl border border-slate-200/60" />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-white rounded-2xl border border-slate-200/60"
            />
          ))}
        </div>
        <div className="h-96 bg-white rounded-2xl border border-slate-200/60" />
      </div>
    );
  }

  const getGradeBadge = (grade) => {
    const colors = {
      strongJunior: "bg-purple-50 text-purple-700 border-purple-100",
      junior: "bg-blue-50 text-blue-700 border-blue-100",
      middle: "bg-amber-50 text-amber-700 border-amber-100",
      senior: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
    return colors[grade] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0 opacity-50" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-qizil1/5 border-4 border-slate-50 overflow-hidden shadow-md">
              {userData?.avatar ? (
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-16 h-16 text-qizil1/30" />
                </div>
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 hover:text-qizil1 transition-colors">
              <Edit2 size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 mb-1">
              {userData?.firstName} {userData?.lastName}
            </h1>
            <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
              <span className="opacity-60">ID:</span>{" "}
              {userData?._id?.slice(-8).toUpperCase()}
            </p>
            <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
              <span
                className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${getGradeBadge(userData?.grade)}`}
              >
                {userData?.grade} Grade
              </span>
              <span className="px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                Active Student
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Tests Taken
            </p>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {userData?.testsHistory?.length || 0}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-qizil1/5 rounded-xl">
              <Activity className="w-5 h-5 text-qizil1" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Experience
            </p>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {userData?.gradeExperience}+ Yrs
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Status
            </p>
          </div>
          <h3 className="text-3xl font-black text-slate-900">Verified</h3>
        </div>
      </div>

      {/* Main Tabs Section */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100 p-2 bg-slate-50/50">
          {["about", "activity", "tests", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all uppercase tracking-widest ${
                activeTab === tab
                  ? "bg-white text-qizil1 shadow-sm border border-slate-200/60"
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === "about" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow
                icon={<Mail size={20} />}
                label="Email Address"
                value={userData?.email}
              />
              <InfoRow
                icon={<Phone size={20} />}
                label="Phone Number"
                value="+998 90 123 45 67"
              />
              <InfoRow
                icon={<MapPin size={20} />}
                label="Current Location"
                value="Tashkent, Uzbekistan"
              />
              <InfoRow
                icon={<Briefcase size={20} />}
                label="Personal Portfolio"
                value="www.orbitest.uz"
              />
            </div>
          )}

          {activeTab !== "about" && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-slate-200 animate-spin-slow" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Section in development
              </h3>
              <p className="text-slate-400 text-sm">
                We are working on this feature. It will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="group flex items-center gap-5 p-5 rounded-2xl border border-slate-100 hover:border-qizil1/20 hover:bg-slate-50/50 transition-all duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-qizil1/5 group-hover:text-qizil1 transition-colors">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800 truncate">{value}</p>
    </div>
    <ChevronRight
      size={16}
      className="text-slate-200 group-hover:text-slate-400 transition-colors"
    />
  </div>
);

export default Profil;
