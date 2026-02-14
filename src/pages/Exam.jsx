import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FileText,
  Calendar,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ClipboardList,
  Zap,
  Plus,
  X,
  Link as LinkIcon,
  MessageSquare,
  Send,
  ExternalLink,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { showToast } from "../helper/ShowToast";

const Exam = () => {
  const [userData, setData] = useState(null);
  const [myResults, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    projectLink: "",
    describe: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      // Загружаем экзамены
      const examsRes = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/exam/myExams",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Загружаем результаты (все работы студента)
      const resultsRes = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/exam/my-results",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData(examsRes.data);
      setResults(resultsRes.data.results || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitResult = async (e) => {
    e.preventDefault();
    if (!formData.projectLink || !selectedExam) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_API + "/api/exam/result",
        {
          projectLink: formData.projectLink,
          describe: formData.describe,
          examId: selectedExam._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        showToast("Work submitted successfully!", "success");
        setIsModalOpen(false);
        setFormData({ projectLink: "", describe: "" });
        fetchData();
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to submit work",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getExamResult = (examId) => {
    return myResults.find(
      (r) => r.examId?._id === examId || r.examId === examId
    );
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-white rounded-lg border border-slate-200/60" />
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-64 bg-white rounded-2xl border border-slate-200/60"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!userData || !userData.exams || userData.exams.length === 0) {
    return (
      <div className="max-w-5xl mx-auto min-h-[500px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No Exams Found</h3>
        <p className="text-slate-500 mt-2 max-w-sm">
          There are no exams scheduled for your group at the moment.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    if (status === "completed")
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  const getResultStatusStyle = (status) => {
    switch (status) {
      case "appreciated":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="mb-2 text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          My Exams
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          View and manage your upcoming and past examinations.
        </p>
      </div>

      <div className="grid gap-6">
        {userData.exams.map((exam) => {
          const result = getExamResult(exam._id);
          const isSubmitted = !!result;

          return (
            <div
              key={exam._id}
              className="group bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 -z-0 opacity-50 transition-transform group-hover:scale-110" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${getStatusBadge(exam.status)}`}
                      >
                        {exam.status === "completed" ? "Completed" : "Upcoming"}
                      </span>
                      {isSubmitted && (
                        <span
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${getResultStatusStyle(result.status)}`}
                        >
                          {result.status === "appreciated"
                            ? "Passed"
                            : result.status === "rejected"
                              ? "Rejected"
                              : "Submitted"}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-qizil1 transition-colors">
                      {exam.examTitle}
                    </h2>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-2xl line-clamp-2">
                      {exam.examDescribe}
                    </p>
                  </div>
                  <div className="bg-qizil1/5 border border-qizil1/10 p-4 rounded-2xl text-center min-w-[120px]">
                    <p className="text-[10px] font-bold text-qizil1 uppercase tracking-widest mb-1">
                      Max Score
                    </p>
                    <p className="text-3xl font-black text-qizil1">
                      {exam.maxScore}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-slate-200 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                        Starts At
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {new Date(exam.examStart).toLocaleString("en-US", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-slate-200 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                        Ends At
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {new Date(exam.examEnd).toLocaleString("en-US", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                  <div className="flex-1 w-full overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={16} className="text-qizil1" />
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Requirements
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {exam.requirements?.slice(0, 3).map((req, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-[10px] font-bold text-slate-500"
                        >
                          {req.requirement} ({req.score} pts)
                        </div>
                      ))}
                      {exam.requirements?.length > 3 && (
                        <span className="text-[10px] font-bold text-slate-300">
                          +{exam.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex gap-3 w-full md:w-auto">
                    {isSubmitted ? (
                      <button
                        onClick={() => {
                          setSelectedResult(result);
                          setSelectedExam(exam);
                          setIsResultModalOpen(true);
                        }}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black shadow-xl shadow-slate-900/20 transition-all active:scale-95"
                      >
                        <FileText size={16} />
                        View Result
                      </button>
                    ) : exam.status === "completed" || exam.isEnd ? (
                      <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-sm bg-slate-50 px-8 py-4 rounded-xl border border-slate-100 w-full md:w-auto">
                        <XCircle size={18} />
                        <span>Submission Closed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedExam(exam);
                          setIsModalOpen(true);
                        }}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-qizil1 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-qizil2 shadow-lg shadow-qizil1/20 transition-all active:scale-95"
                      >
                        <Send size={16} />
                        Submit Work
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden"
            >
              <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Submit Your Work
                  </h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">
                    {selectedExam?.examTitle}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-qizil1 shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmitResult} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Project URL *
                  </label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-qizil1 transition-colors">
                      <LinkIcon size={20} />
                    </div>
                    <input
                      required
                      type="url"
                      placeholder="https://github.com/your-project"
                      value={formData.projectLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectLink: e.target.value,
                        })
                      }
                      className="w-full h-16 pl-14 pr-6 bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] outline-none focus:border-qizil1/30 focus:bg-white transition-all text-sm font-bold text-slate-700"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Comments (Optional)
                  </label>
                  <div className="relative group">
                    <div className="absolute left-5 top-6 text-slate-300 group-focus-within:text-qizil1 transition-colors">
                      <MessageSquare size={20} />
                    </div>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your implementation..."
                      value={formData.describe}
                      onChange={(e) =>
                        setFormData({ ...formData, describe: e.target.value })
                      }
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] outline-none focus:border-qizil1/30 focus:bg-white transition-all text-sm font-bold text-slate-700 resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-5 px-8 rounded-2xl bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !formData.projectLink}
                    className="flex-[2] py-5 px-8 rounded-2xl bg-qizil1 text-white font-black uppercase tracking-widest text-[10px] hover:bg-qizil2 shadow-xl shadow-qizil1/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Results</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Result Modal */}
      <AnimatePresence>
        {isResultModalOpen && selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Work Details
                  </h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">
                    {selectedExam?.examTitle}
                  </p>
                </div>
                <button
                  onClick={() => setIsResultModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-qizil1 shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-10 space-y-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Submission Status
                    </p>
                    <span
                      className={`px-4 py-1.5 rounded-xl text-sm font-black uppercase tracking-widest border ${getResultStatusStyle(selectedResult.status)}`}
                    >
                      {selectedResult.status === "appreciated"
                        ? "PASSED"
                        : selectedResult.status === "rejected"
                          ? "REJECTED"
                          : "PENDING"}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Final Score
                    </p>
                    <p className="text-5xl font-black text-slate-900 tracking-tighter">
                      {selectedResult.score || 0}{" "}
                      <span className="text-slate-300 text-2xl">
                        / {selectedExam?.maxScore}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Submission Info
                  </h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="text-slate-300" size={18} />
                        <span className="text-sm font-bold text-slate-700">
                          Project URL
                        </span>
                      </div>
                      <a
                        href={selectedResult.projectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-black text-qizil1 hover:underline"
                      >
                        VISIT LINK
                      </a>
                    </div>
                    {selectedResult.describe && (
                      <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                          Feedback / Comment
                        </p>
                        <p className="text-sm text-slate-600 font-medium italic">
                          "{selectedResult.describe}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedResult.requirements?.length > 0 &&
                  selectedResult.status !== "pending" && (
                    <div className="space-y-4 pt-4">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Requirements Checklist
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedResult.requirements.map((req, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${req.isDone ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                          >
                            <div className="flex items-center gap-3">
                              {req.isDone ? (
                                <CheckCircle size={16} />
                              ) : (
                                <XCircle size={16} />
                              )}
                              <span className="text-xs font-bold">
                                {req.requirement}
                              </span>
                            </div>
                            <span className="text-[10px] font-black">
                              +{req.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <button
                  onClick={() => setIsResultModalOpen(false)}
                  className="w-full py-5 px-8 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-black shadow-xl active:scale-95 transition-all"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Exam;
