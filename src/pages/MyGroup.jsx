import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  Award, 
  Activity, 
  Clock, 
  Calendar, 
  Mail, 
  Layers, 
  ChevronRight,
  TrendingUp,
  User,
  Zap,
  Code,
  LayoutGrid,
  List
} from 'lucide-react';
import google from "../assets/google.svg";
import { motion } from 'framer-motion';

const MyGroup = () => {
    const [userData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("grid");

    const fetchMyGroup = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return setLoading(false);

            const res = await axios.get(
                import.meta.env.VITE_BACKEND_API + "/api/group/my",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setData(res.data.group);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyGroup();
    }, []);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
                <div className="h-48 bg-white rounded-2xl border border-slate-200/60" />
                <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200/60" />)}
                </div>
                <div className="h-96 bg-white rounded-2xl border border-slate-200/60" />
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="max-w-5xl mx-auto min-h-[500px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No Group Assigned</h3>
                <p className="text-slate-500 mt-2 max-w-sm">You haven't been assigned to any study group yet. Please contact your mentor.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Group Header Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0 opacity-50" />
                
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-32 h-32 rounded-2xl bg-qizil1/5 border-4 border-slate-50 overflow-hidden shadow-md flex items-center justify-center">
                        <Layers className="w-16 h-16 text-qizil1/30" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-qizil1/5 text-qizil1 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-qizil1/10 mb-3">
                            Current Group
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                            {userData.groupName}
                        </h1>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                            {userData.groupDescribe}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Group Progress</p>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">{userData.totalScore?.toFixed(1) || 0}%</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-qizil1/5 rounded-xl">
                            <Activity className="w-5 h-5 text-qizil1" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Performance</p>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">{userData.groupPerformance || 0}/5.0</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <Zap className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Test Attempts</p>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">{userData.attemptsCount || 0}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Mentor Section */}
                {userData?.mentor && (
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-8 h-full">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-qizil1" />
                                Mentor Profile
                            </h2>
                            
                            <div className="text-center md:text-left mb-8">
                                <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-slate-100 mx-auto md:mx-0 mb-4 flex items-center justify-center overflow-hidden shadow-sm">
                                    {userData.mentor.avatar ? (
                                        <img src={userData.mentor.avatar} alt="Mentor" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-10 h-10 text-slate-200" />
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{userData.mentor.firstName} {userData.mentor.lastName}</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1 break-all">{userData.mentor.email}</p>
                                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                    <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">
                                        {userData.mentor.grade}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {userData.mentor.skills?.length > 0 ? (
                                        userData.mentor.skills.map((skill) => (
                                            <span key={skill._id} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                                                {skill.skillTitle}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-slate-400 italic">No skills listed</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Classmates Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/30 gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-qizil1" />
                                    Classmates
                                </h2>
                                <p className="text-xs text-slate-400 font-medium mt-1">{userData.students?.length || 0} students in this group</p>
                            </div>
                            <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-sm self-stretch sm:self-auto">
                                <button 
                                    onClick={() => setView("grid")}
                                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === "grid" ? 'bg-qizil1 text-white shadow-lg shadow-qizil1/20' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <LayoutGrid size={14} />
                                    Grid
                                </button>
                                <button 
                                    onClick={() => setView("table")}
                                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === "table" ? 'bg-qizil1 text-white shadow-lg shadow-qizil1/20' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <List size={14} />
                                    List
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            {view === "grid" ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {userData.students?.map((s, i) => (
                                        <div key={s._id || i} className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-qizil1/20 hover:bg-slate-50 transition-all duration-300">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-black group-hover:bg-qizil1 group-hover:text-white transition-all">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-800 truncate">{s.firstName} {s.lastName}</p>
                                                <p className="text-xs text-slate-400 font-medium truncate">{s.email}</p>
                                            </div>
                                            <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left border-b border-slate-100">
                                                <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                                                <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                                                <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData.students?.map((s, i) => (
                                                <tr key={s._id || i} className="group border-b last:border-0 border-slate-50">
                                                    <td className="py-4 text-sm font-bold text-slate-400">{i + 1}</td>
                                                    <td className="py-4">
                                                        <p className="text-sm font-bold text-slate-800 group-hover:text-qizil1 transition-colors">{s.firstName} {s.lastName}</p>
                                                    </td>
                                                    <td className="py-4 text-sm text-slate-500 font-medium">{s.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyGroup;