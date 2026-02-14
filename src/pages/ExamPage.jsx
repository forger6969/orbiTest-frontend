import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ExamPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false); // ✅ Qo'shildi
    const [submitSuccess, setSubmitSuccess] = useState(false); // ✅ Qo'shildi

    const [link, setLink] = useState("");
    const [comment, setComment] = useState("");
    const [linkError, setLinkError] = useState("");

    const fetchExam = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");

            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_API}/api/exam/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setExamData(data.exam);
        } catch (err) {
            setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchExam();
    }, [fetchExam]);

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleString("uz-UZ", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            : "—";

    const calculateDuration = (start, end) => {
        if (!start || !end) return "—";
        const diff = new Date(end) - new Date(start);
        return `${Math.floor(diff / 60000)} daqiqa`;
    };

    const getStatusText = (status) => {
        const statusMap = {
            completed: "Yakunlangan",
            active: "Faol",
            pending: "Kutilmoqda",
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        const colorMap = {
            completed: "bg-green-100 text-green-800",
            active: "bg-blue-100 text-blue-800",
            pending: "bg-yellow-100 text-yellow-800",
        };
        return colorMap[status] || "bg-gray-100 text-gray-800";
    };

    const validateForm = () => {
        if (!link.trim()) {
            setLinkError("Havola kiritish majburiy");
            return false;
        }
        if (!link.startsWith("https://")) {
            setLinkError("Havola https:// bilan boshlanishi kerak");
            return false;
        }
        setLinkError("");
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setSubmitting(true);
            setError(null);
            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/api/exam/result`,
                {
                    examId: id,
                    projectLink: link.trim(),
                    describe: comment.trim(),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Javob:", data);
            setSubmitSuccess(true);

            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (err) {
            console.error("Xatolik:", err);
            setError(
                err.response?.data?.message || "Natijani yuborishda xatolik yuz berdi"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin h-10 w-10 border-b-2 border-red-500 rounded-full" />
            </div>
        );

    if (error && !examData)
        return (
            <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md rounded-xl p-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <p className="text-red-800 text-center font-semibold">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Orqaga qaytish
                    </button>
                </div>
            </div>
        );

    if (error && !examData)
        return (
            <div className="text-red-600 text-center py-10">{error}</div>
        );

    if (!examData) return null;

    return (
        <div
            className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center p-4"
            onClick={() => navigate(-1)}
        >
            <div
                className="bg-white w-full max-w-3xl rounded-xl p-6 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold">
                        Imtihon ma'lumotlari
                    </h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-2xl hover:text-red-500 transition"
                    >
                        ✕
                    </button>
                </div>

                {submitSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-green-800 text-center font-semibold">
                            Natija muvaffaqiyatli yuborildi!
                        </p>
                    </div>
                )}


                {error && examData && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <p className="text-red-800 text-center">{error}</p>
                    </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-xl font-bold">
                        {examData.examTitle}
                    </h3>
                    {examData.examDescribe && (
                        <p className="text-gray-600">
                            {examData.examDescribe}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <span>Status:</span>
                    <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                            examData.status
                        )}`}
                    >
                        {getStatusText(examData.status)}
                    </span>
                    {examData.isEnd && (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            Tugagan
                        </span>
                    )}
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 block mb-1">
                            Havola <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => {
                                setLink(e.target.value);
                                setLinkError("");
                            }}
                            placeholder="https://example.com"
                            disabled={submitting || submitSuccess}
                            className={`w-full border rounded-lg px-4 py-2 outline-none transition ${linkError
                                ? "border-red-400 focus:border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />
                        {linkError && (
                            <p className="text-sm text-red-500 mt-1">
                                {linkError}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 block mb-1">
                            Izoh
                        </label>
                        <textarea
                            rows={3}
                            maxLength={350}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={submitting || submitSuccess}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition"
                            placeholder="Qo'shimcha izoh..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {comment.length}/350
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!link.startsWith("https://") || submitting || submitSuccess}
                        className={`w-full py-2 rounded-lg font-semibold transition ${link.startsWith("https://") && !submitting && !submitSuccess
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {submitting ? "Yuklanmoqda..." : submitSuccess ? "✓ Yuborildi" : "Yuborish"}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="shadow p-4 rounded-md">
                        <p className="text-sm text-gray-600">
                            Maksimal ball
                        </p>
                        <p className="text-2xl font-bold">
                            {examData.maxScore}
                        </p>
                    </div>

                    <div className="shadow p-4 rounded-md">
                        <p className="text-sm text-gray-600">
                            Davomiyligi
                        </p>
                        <p className="text-2xl font-bold">
                            {calculateDuration(
                                examData.examStart,
                                examData.examEnd
                            )}
                        </p>
                    </div>
                </div>

                <div className="shadow p-4 rounded-lg mt-6">
                    <h4 className="font-semibold mb-3">
                        Vaqt ma'lumotlari
                    </h4>
                    <p>
                        Boshlanish: {formatDate(examData.examStart)}
                    </p>
                    <p>
                        Tugash: {formatDate(examData.examEnd)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExamPage;