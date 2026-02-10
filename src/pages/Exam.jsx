import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
            console.log(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExam();
    }, []);

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

    if (!userData || !userData.exams || userData.exams.length === 0) {
        return (
            <div className="min-h-[500px] flex items-center justify-center">
                <p className="text-qizil1 text-lg font-semibold">
                    Exzamen topilmadi
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Mening Imtihonlarim</h1>

            <div className="grid gap-6">
                {userData.exams.map((exam) => (
                    <div
                        key={exam.id}
                        className="bg-white rounded-lg shadow-lg p-6  "
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {exam.examTitle}
                                </h2>
                                <p className="text-gray-600 mt-1">{exam.examDescribe}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${exam.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {exam.status === 'completed' ? 'Yakunlangan' : 'Kutilmoqda'}
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-sm text-gray-500">Boshlanish vaqti</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {new Date(exam.examStart).toLocaleString('uz-UZ')}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-sm text-gray-500">Tugash vaqti</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {new Date(exam.examEnd).toLocaleString('uz-UZ')}
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">Maksimal ball:</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {exam.maxScore}
                                </span>
                            </div>
                        </div>

                        {exam.requirements && exam.requirements.length > 0 && (
                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-gray-700 mb-3">Talablar:</h3>
                                <div className="space-y-2">
                                    {exam.requirements.map((req) => (
                                        <div
                                            key={req.id}
                                            className="flex justify-between items-center bg-gray-50 p-3 rounded"
                                        >
                                            <span className="text-gray-700">{req.requirement}</span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                {req.score}/{exam.maxScore}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {exam.isEnd && (
                            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                                Imtihon yakunlangan
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Exam