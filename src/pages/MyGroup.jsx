import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiClock, FiCalendar, FiPlusCircle, FiRefreshCw } from 'react-icons/fi';
import google from "../assets/google.svg"

const MyGroup = () => {
    const [userData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("default");

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
            console.log(res.data.group);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyGroup();
    }, []);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 border-4 border-red-300 border-t-qizil1 rounded-full animate-spin" />
                <p className="text-red-600 font-semibold tracking-wide">
                    Yuklanmoqda...
                </p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-[500px] flex items-center justify-center">
                <p className="text-qizil1 text-lg font-semibold">
                    Sizni grupangiz topilmadi
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="relative overflow-hidden rounded-xl  shadow-lg p-1 ">
                <div className="bg-white/90 backdrop-blur rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                    <img
                        src="data:image/png;base64,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"
                        alt={userData.groupName}
                        className="w-32 h-32 rounded-full shadow-lg"
                    />
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-qizil1">
                            {userData.groupName}
                        </h1>
                        <p className="text-gray-600 mt-2 text-lg">
                            Group name:
                            {" " + userData.groupDescribe}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Umumiy ball", value: `${userData.totalScore.toFixed(2)}%`, },
                    { label: "Group Performance", value: `${userData.groupPerformance}/5`, },
                    { label: "Urinishlar", value: userData.attemptsCount, },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="group relative bg-white rounded-lg p-6 shadow-lg   border-gray-100"
                    >
                        <div className={`absolute top-0 left-0 w-1 h-full bg-${item.color}-500 rounded-l-3xl`}></div>

                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-3">
                                    {item.label}
                                </p>
                                <p className={`text-4xl font-bold text-qizil1  `}>
                                    {item.value}
                                </p>
                            </div>

                            <div className={`text-5xl group-hover:rotate-12 transition-transform bg-${item.color}-50 p-3 rounded-2xl`}>
                                {/* icon  */}
                            </div>
                        </div>


                    </div>
                ))}
            </div>




            {userData?.mentor && (
                <div className="bg-white rounded-lg shadow-lg   p-6 space-y-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-qizil1">
                                Mentor profili
                            </h2>
                            <p className="text-sm text-gray-500">
                                Mentor haqida umumiy ma’lumot
                            </p>
                        </div>

                        <span className="inline-block bg-red-50 text-qizil1 text-sm font-medium px-4 py-1 rounded-full w-fit">
                            {userData.mentor.grade?.toUpperCase()}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="md:col-span-1 space-y-2">
                            <p className="text-xl font-semibold text-gray-900">
                                {userData.mentor.firstName} {userData.mentor.lastName}
                            </p>

                            <div className="flex items-center gap-2">

                                <img className="pt-1" width={17} src={google} alt="" />

                                <p className="  text-sm text-gray-600 break-all">
                                    {userData.mentor.email}
                                </p>

                            </div>

                            <p className="text-sm text-qizil1 font-medium mt-3">
                                {userData.mentor.bio
                                    ? userData.mentor.bio
                                    : "Mentor bio ma’lumoti kiritilmagan"}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Ko‘nikmalar (Skills)
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {userData.mentor.skills?.map((skill) => (
                                    <div
                                        key={skill._id}
                                        className="border border-gray-100 rounded-xl p-4 hover:shadow transition"
                                    >
                                        <p className="font-semibold text-qizil1">
                                            {skill.skillTitle}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                            {skill.skillDescribe}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {userData.students?.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-qizil1 mb-6">
                            O‘quvchilar ({userData.students.length})
                        </h2>



                        <select value={view} onChange={(e) => setView(e.target.value)} defaultValue="Pick a font" className="select  border-none w-40 focus:outline-hidden rounded-md px-3 py-2 text-sm">
                            <option value="default">Default</option>
                            <option value="table">Table</option>
                        </select>

                    </div>
                    {view === "default" && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userData.students.map((s, i) => (
                                <div
                                    key={s._id || i}
                                    className="flex items-center gap-4 bg-red-50 p-4 rounded-lg"
                                >
                                    <div className="w-10 h-10 bg-qizil1 text-white rounded-full flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {s.firstName} {s.lastName}
                                        </p>
                                        <p className="text-sm text-gray-600">{s.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {view === "table" && (
                        <div className="overflow-x-auto mt-6">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ism</th>
                                        <th>Familiya</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {userData.students.map((s, i) => (
                                        <tr key={s._id || i} className="hover">
                                            <th>{i + 1}</th>
                                            <td>{s.firstName}</td>
                                            <td>{s.lastName}</td>
                                            <td>{s.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}


                </div>
            )}
        </div>
    );
};

export default MyGroup;
