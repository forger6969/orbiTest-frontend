import React, { useState } from "react";
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTestSocket } from "../hooks/useTestSocket";
import { motion, AnimatePresence } from "framer-motion";

export default function TestExamRunner({ test }) {
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(test.testTime); // milliseconds
  const [isRunning, setIsRunning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const mess = JSON.parse(localStorage.getItem("mssage"));
  const userId = localStorage.getItem("userId");
  const { startTest, finishTest } = useTestSocket(userId);

  React.useEffect(() => {
    if (test && userId) {
      startTest(test._id, test.testTitle);
    }
    return () => {
      if (test && userId) {
        finishTest(test._id, 0, 0);
      }
    };
  }, [test?._id, userId]);

  React.useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          setIsRunning(false);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSelect = (questionId, answer) => {
    setAnswers((prev) => {
      const exists = prev.find((a) => a.questionId === questionId);
      if (exists) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, answer } : a
        );
      }
      return [...prev, { questionId, answer }];
    });
  };

  const getSelectedAnswer = (questionId) => {
    return answers.find((a) => a.questionId === questionId)?.answer;
  };

  const endTest = async () => {
    try {
      const token = localStorage.getItem("token");
      const req = await axios.post(
        import.meta.env.VITE_BACKEND_API + "/api/test/result",
        { answers, testId: test._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await req.data;
      localStorage.setItem("mssage", JSON.stringify(req.data));
      if (userId && data.result) {
        finishTest(test._id, data.result.score, data.result.successRate);
      }
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleAutoSubmit = async () => {
    if (!loading) await handleFinishClick();
  };

  const handleFinishClick = async () => {
    setLoading(true);
    try {
      await endTest();
      setOpenModal(true);
    } catch (error) {
      alert("Ошибка при отправке результатов");
    } finally {
      setLoading(false);
    }
  };

  const Modalandnavi = async () => {
    setOpenModal(false);
    navigate("/test-results", {
      state: { results: mess, test: test, answers: answers },
    });
  };

  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (answers.length > 0 && !openModal) {
        e.preventDefault();
        e.returnValue = "Progress will be lost!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answers.length, openModal]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Glass Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="group flex items-center gap-2 text-slate-500 hover:text-qizil1 transition-all font-bold text-sm"
              onClick={() => {
                if (window.confirm("Вы уверены, что хотите выйти?")) {
                  if (userId) finishTest(test._id, 0, 0);
                  navigate("/dashboard/tests");
                }
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-qizil1/30 transition-all">
                <ChevronLeft size={18} />
              </div>
              <span className="hidden sm:block uppercase tracking-widest">
                Back
              </span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                Testing Mode
              </span>
              <span className="text-sm font-black text-slate-900 leading-none">
                {test.testTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Secure Session
            </div>

            <div
              className={`flex items-center gap-3 px-5 py-2 rounded-2xl border transition-all ${
                timeLeft < 60000
                  ? "bg-red-50 border-red-200 text-red-600 animate-pulse"
                  : "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20"
              }`}
            >
              <Clock
                size={16}
                className={timeLeft < 60000 ? "text-red-500" : "text-white/50"}
              />
              <span className="font-black font-mono text-sm tracking-tighter">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden">
          <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-qizil1 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-qizil1/20">
                {currentQuestionIndex + 1}
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Question of {test.questions.length}
              </h3>
            </div>
            <div className="w-40 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-qizil1 transition-all duration-700 ease-out"
                style={{
                  width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="p-10 md:p-16 min-h-[450px]">
            {(() => {
              const question = test.questions[currentQuestionIndex];
              const selectedAnswer = getSelectedAnswer(question._id);

              return (
                <div key={question._id} className="space-y-12">
                  <p className="text-2xl font-black text-slate-800 leading-tight tracking-tight">
                    {question.question}
                  </p>

                  <div className="space-y-3">
                    {Object.entries(question.variants)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => (
                        <label
                          key={key}
                          className={`group flex items-center gap-5 p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                            selectedAnswer === key
                              ? "border-qizil1 bg-qizil1/5 shadow-xl shadow-qizil1/10"
                              : "border-slate-50 hover:border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedAnswer === key
                                ? "border-qizil1 bg-qizil1 scale-110"
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            {selectedAnswer === key && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            className="hidden"
                            checked={selectedAnswer === key}
                            onChange={() => handleSelect(question._id, key)}
                          />
                          <span
                            className={`text-base font-bold transition-colors ${
                              selectedAnswer === key
                                ? "text-slate-900"
                                : "text-slate-500 group-hover:text-slate-900"
                            }`}
                          >
                            {value}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="px-10 py-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={18} /> Orqaga
            </button>

            {currentQuestionIndex < test.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="flex items-center gap-2 px-12 py-4 bg-qizil1 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-qizil2
                shadow-xl shadow-slate-900/20 transition-all active:scale-95"
              >
                Keyingisi <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleFinishClick}
                disabled={loading}
                className="flex items-center gap-2 px-12 py-4 bg-qizil1 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-qizil2 shadow-xl shadow-qizil1/30 transition-all active:scale-95"
              >
                {loading ? "..." : "Tugatish"}
              </button>
            )}
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 p-5 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {test.questions.map((question, index) => {
            const isAnswered = answers.some(
              (a) => a.questionId === question._id
            );
            const isCurrent = currentQuestionIndex === index;

            return (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all duration-300 transform ${
                  isCurrent
                    ? "bg-slate-900 text-white shadow-xl scale-110 -translate-y-1"
                    : isAnswered
                      ? "bg-qizil1/10 text-qizil1 border border-qizil1/20"
                      : "bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </nav>

      {loading && (
        <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-20 h-20 border-4 border-slate-200 border-t-qizil1 rounded-full animate-spin mb-6" />
          <p className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] animate-pulse">
            Processing Results
          </p>
        </div>
      )}

      <AnimatePresence>
        {openModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-12 text-center relative overflow-hidden"
            >
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-emerald-100">
                <CheckCircle size={48} strokeWidth={2.5} />
              </div>

              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                Great Work!
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-10">
                Test successfully completed
              </p>

              <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border border-slate-100 shadow-inner">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                  Final Score
                </p>
                <p className="text-6xl font-black text-qizil1 tracking-tighter">
                  {(() => {
                    const value = Number(mess?.result?.successRate);
                    return value === 100 ? "100%" : `${Math.floor(value)}%`;
                  })()}
                </p>
              </div>

              <button
                onClick={Modalandnavi}
                className="w-full bg-slate-900 text-white font-black uppercase tracking-widest text-xs py-5 px-8 rounded-2xl transition-all shadow-2xl hover:bg-black hover:shadow-slate-900/40 active:scale-95 flex items-center justify-center gap-3"
              >
                <span>View Full Results</span>
                <ChevronRight size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
