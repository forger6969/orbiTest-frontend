import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Exam = () => {
    const [userData, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchExam = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return setLoading(false);

            const res = await axios.get(
                import.meta.env.VITE_BACKEND_API + "/api/exam/myExams",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setData(res.data);
        } catch (err) {
            console.error("Error fetching exams:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExam();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('uz-UZ', { month: 'short' }),
            year: date.getFullYear()
        };
    };

    const isUpcoming = (startDate) => new Date(startDate) > new Date();
    const isActive = (startDate, endDate) => {
        const now = new Date();
        return now >= new Date(startDate) && now <= new Date(endDate);
    };

    if (loading) {
        return (
            <div className="min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-qizil1 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    if (!userData || !userData.exams || userData.exams.length === 0) {
        return (
            <div className="min-h-[500px] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <svg className="w-10 h-10 text-qizil1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Imtihonlar mavjud emas</h3>
                    <p className="text-sm text-gray-500">Hozircha sizga biriktirilgan imtihonlar yo'q</p>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10">
                    <div className="flex items-start flex-col">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Mening Imtihonlarim
                        </h1>
                        <p className="text-gray-600 ">
                            Jami {userData.exams.length} ta imtihon
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {userData.exams.map((exam, index) => {
                        const startDate = formatDate(exam.examStart);
                        const endDate = formatDate(exam.examEnd);
                        const upcoming = isUpcoming(exam.examStart);
                        const active = isActive(exam.examStart, exam.examEnd);

                        return (
                            <div
                                key={exam.id}
                                className="group relative bg-white rounded-2xl border border-gray-200/80  shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >

                                <div className="absolute top-4 right-4 z-10">
                                    {exam.status === 'completed' ? (
                                        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full shadow-sm ring-1 ring-emerald-600/20">
                                             <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                             </svg>
                                             <span className="text-xs font-semibold">Tugallandi</span>
                                         </div>
                                     ) : active ? (
                                         <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full shadow-sm ring-1 ring-blue-600/20">
                                             <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                                             <span className="text-xs font-semibold">Faol</span>
                                         </div>
                                     ) : (
                                         <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full shadow-sm ring-1 ring-amber-600/20">
                                             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                             </svg>
                                             <span className="text-xs font-semibold">Kutilmoqda</span>
                                         </div>
                                     )}
                                 </div>

                                 <div className="px-6 pt-6 pb-5">
                                     <h3 className="font-bold text-gray-900 text-lg leading-tight pr-24 mb-1 group-hover:text-qizil1 transition-colors">
                                         {exam.examTitle}
                                     </h3>
                                     {exam.examDescribe && (
                                         <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                                             {exam.examDescribe}
                                         </p>
                                     )}
                                 </div>

                                 <div className="px-6">
                                     <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                                 </div>

                                 <div className="px-6 py-5 space-y-5">
                                     <div className="grid grid-cols-2 gap-3">
                                         <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-3.5 border border-gray-200/50">
                                             <div className="relative z-10">
                                                 <p className="text-xs font-medium text-gray-500 mb-1.5">
                                                     Boshlanish
                                                 </p>
                                                 <div className="flex items-baseline gap-1">
                                                     <span className="text-2xl font-bold text-gray-900 tabular-nums">
                                                         {startDate.day}
                                                     </span>
                                                     <span className="text-xs font-semibold text-gray-600">
                                                         {startDate.month}
                                                     </span>
                                                 </div>
                                             </div>
                                             <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/40 rounded-full blur-xl"></div>
                                         </div>

                                         <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-3.5 border border-gray-200/50">
                                             <div className="relative z-10">
                                                 <p className="text-xs font-medium text-gray-500 mb-1.5">
                                                     Tugash
                                                 </p>
                                                 <div className="flex items-baseline gap-1">
                                                     <span className="text-2xl font-bold text-gray-900 tabular-nums">
                                                         {endDate.day}
                                                     </span>
                                                     <span className="text-xs font-semibold text-gray-600">
                                                         {endDate.month}
                                                     </span>
                                                 </div>
                                             </div>
                                             <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/40 rounded-full blur-xl"></div>
                                         </div>
                                     </div>

                                     {/* Score Highlight */}
                                     <div className="relative overflow-hidden bg-gradient-to-br from-qizil1 via-red-600 to-red-700 rounded-xl p-5 shadow-lg shadow-red-500/20">
                                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                                         <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

                                         <div className="relative z-10 flex items-center justify-between">
                                             <div>
                                                 <p className="text-xs font-medium text-red-100 mb-1">
                                                     Maksimal Ball
                                                 </p>
                                                 <p className="text-4xl font-bold text-white tabular-nums">
                                                     {exam.maxScore}
                                                 </p>
                                             </div>
                                             <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-white/20">
                                                 <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                 </svg>
                                             </div>
                                         </div>
                                     </div>

                                     {/* Requirements Section */}
                                     {exam.requirements && exam.requirements.length > 0 && (
                                         <div>
                                             <div className="flex items-center justify-between mb-3">
                                                 <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                                     Talablar
                                                 </h4>
                                                 <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                                     {exam.requirements.length}
                                                 </span>
                                             </div>
                                             <div className="flex flex-wrap gap-2">
                                                 {exam.requirements.slice(0, 5).map((req) => (
                                                     <div
                                                         key={req.id}
                                                         className="group/req relative overflow-hidden bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-qizil1/30 rounded-lg px-3 py-2 transition-all hover:shadow-md"
                                                     >
                                                         <div className="relative z-10">
                                                             <span className="text-xs font-bold text-gray-900 tabular-nums">
                                                                 {req.score}
                                                             </span>
                                                             <span className="text-xs text-gray-500 ml-0.5">ball</span>
                                                         </div>
                                                         <div className="absolute inset-0 bg-gradient-to-br from-qizil1/5 to-transparent opacity-0 group-hover/req:opacity-100 transition-opacity"></div>
                                                     </div>
                                                 ))}
                                                 {exam.requirements.length > 5 && (
                                                     <div className="bg-gradient-to-br from-qizil1/10 to-red-100/50 border border-qizil1/20 rounded-lg px-3 py-2">
                                                         <span className="text-xs font-bold text-qizil1 tabular-nums">
                                                             +{exam.requirements.length - 5}
                                                         </span>
                                                     </div>
                                                 )}
                                             </div>
                                         </div>
                                     )}
                                 </div>

                                 <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-qizil1/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             </div>
                         );
                     })}
                 </div>
             </div>
         </div>
     );
 };

 export default Exam;
