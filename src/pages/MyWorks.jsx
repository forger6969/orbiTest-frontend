import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  MessageSquare,
  Award,
  Search,
  Zap,
  ChevronRight,
} from "lucide-react";

const MyWorks = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchMyWorks = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/exam/my-results",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("MyWorks Response Data:", res.data);

      if (res.data && res.data.success) {
        setResults(res.data.results || []);
      } else {
        setError(
          res.data?.message || "Server returned an unsuccessful response."
        );
      }
    } catch (err) {
      console.error("Error fetching works:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyWorks();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "appreciated":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  const filteredResults = (results || []).filter((r) => {
    const title =
      r.examId?.examTitle ||
      (typeof r.examId === "string"
        ? `Exam ID: ${r.examId.slice(-6)}`
        : "Untitled Exam");
    return title.toLowerCase().includes((search || "").toLowerCase());
  });

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 rounded-lg" />
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-white rounded-2xl border border-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Submitted Works
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Track your exam submissions and mentor feedback.
            <span className="ml-2 text-qizil1 bg-qizil1/5 px-2 py-0.5 rounded text-xs font-bold">
              {results.length} Total
            </span>
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-qizil1/30 transition-all text-sm font-bold text-slate-700 shadow-sm"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl flex items-center gap-4">
          <XCircle size={24} />
          <div className="flex-1">
            <p className="font-black text-sm uppercase tracking-widest">
              Error Loading Data
            </p>
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={fetchMyWorks}
            className="bg-white px-4 py-2 rounded-xl text-xs font-bold border border-red-200 hover:bg-red-100 transition-all shadow-sm"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="grid gap-6">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, idx) => (
            <div
              key={result._id || idx}
              className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle(result.status)}`}
                      >
                        {result.status === "appreciated"
                          ? "Passed"
                          : result.status === "rejected"
                            ? "Rejected"
                            : "Under Review"}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        Submitted{" "}
                        {new Date(result.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-2 group-hover:text-qizil1 transition-colors">
                      {result.examId?.examTitle ||
                        (typeof result.examId === "string"
                          ? `Exam ID: ${result.examId.slice(-6)}`
                          : "Untitled Exam")}
                    </h2>

                    <div className="flex items-center gap-4 mt-4">
                      <a
                        href={result.projectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-qizil1 bg-qizil1/5 px-3 py-2 rounded-lg border border-qizil1/10 hover:bg-qizil1 hover:text-white transition-all shadow-sm"
                      >
                        <ExternalLink size={14} />
                        View Project
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center bg-slate-50 border border-slate-100 p-4 rounded-2xl min-w-[100px]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Score
                      </p>
                      <p className="text-2xl font-black text-slate-800">
                        {result.score || 0}
                        <span className="text-slate-300 text-sm ml-1">
                          /{" "}
                          {result.examId?.maxScore ||
                            result.requirements?.reduce(
                              (acc, r) => acc + (r.score || 0),
                              0
                            ) ||
                            0}
                        </span>
                      </p>
                    </div>
                    <ChevronRight className="text-slate-200 group-hover:text-slate-400 transition-colors hidden md:block" />
                  </div>
                </div>

                {result.describe && (
                  <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 relative group/msg">
                    <div className="absolute -top-3 left-6 px-2 bg-white text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 rounded-md">
                      Mentor Feedback
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                      "{result.describe}"
                    </p>
                  </div>
                )}

                {result.requirements?.length > 0 &&
                  result.status !== "pending" && (
                    <div className="mt-8 pt-8 border-t border-slate-50">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap size={14} className="text-qizil1" />
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                          Requirement Details
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.requirements.map((req, ridx) => (
                          <div
                            key={ridx}
                            className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold flex items-center gap-2 ${req.isDone ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                          >
                            {req.isDone ? (
                              <CheckCircle size={12} />
                            ) : (
                              <XCircle size={12} />
                            )}
                            {req.requirement} ({req.score} pts)
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 p-20 text-center">
                      <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900">No works submitted yet</h3>
                      <p className="text-slate-400 mt-2">Your exam submissions will appear here after you send them.</p>
                      {!error && results.length === 0 && (
                        <p className="text-[10px] text-slate-300 mt-4 font-bold uppercase tracking-widest italic">
                          Verified with server: 0 records found
                        </p>
                      )}
                    </div>
                    
                    {/* Raw Debug View - only visible if empty and no error */}
                    {!error && results.length === 0 && (
                      <div className="p-4 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-2">Raw Server Response (Debug):</p>
                        <pre className="text-[10px] text-emerald-400 font-mono p-4 bg-black/50 rounded-xl overflow-auto max-h-40">
                          {JSON.stringify(results, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
      </div>
    </div>
  );
};

export default MyWorks;
