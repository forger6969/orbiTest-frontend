import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CheckCircle, XCircle, Clock, Award, TrendingUp, ChevronRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState(null);
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("mssage"));
    const locationState = location.state;

    if (locationState?.results) {
      setResults(locationState.results);
      setTest(locationState.test);
      setAnswers(locationState.answers || []);
    } else if (storedResults) {
      setResults(storedResults);
    }
  }, [location.state]);

  if (!results) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-qizil1 rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Loading Results...</p>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate('/dashboard/tests');
  };

  const getAnswerStatus = (questionId, userAnswer) => {
    const questionResult = results.result?.answers?.find(a => a.questionId === questionId);
    if (!questionResult) return { status: 'unanswered', isCorrect: false };

    return {
      status: questionResult.correct ? 'correct' : 'incorrect',
      isCorrect: questionResult.correct,
      correctAnswer: questionResult.correctAnswer,
      userAnswer: questionResult.answer || userAnswer
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Glass Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-qizil1 transition-all font-bold text-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-qizil1/30 transition-all">
              <ChevronLeft size={18} />
            </div>
            <span className="uppercase tracking-widest">Back to Tests</span>
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-qizil1/5 text-qizil1 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-qizil1/10">
            Performance Analysis
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Main Results Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden mb-10">
          <div className="p-10 md:p-16 text-center relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0 opacity-50" />
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-qizil1/5 text-qizil1 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-qizil1/10">
                <Award size={48} strokeWidth={2.5} />
              </div>
              
              <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Test Performance</h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12">Detailed evaluation report</p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 shadow-inner min-w-[200px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Final Score</p>
                  <p className="text-6xl font-black text-qizil1 tracking-tighter">
                    {(() => {
                      const value = Number(results?.result?.successRate);
                      return value === 100 ? "100%" : `${Math.floor(value)}%`;
                    })()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left group hover:border-emerald-200 transition-colors">
                    <CheckCircle className="text-emerald-500 mb-3" size={24} />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Correct</p>
                    <p className="text-2xl font-black text-slate-800">{results.result?.correctAnswers || 0}</p>
                  </div>
                  <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left group hover:border-red-200 transition-colors">
                    <XCircle className="text-red-500 mb-3" size={24} />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wrong</p>
                    <p className="text-2xl font-black text-slate-800">{results.result?.incorrectAnswers || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Section */}
        {test && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 ml-2">
              <FileText className="text-qizil1" size={20} />
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Detailed Analysis</h2>
            </div>

            <div className="space-y-6">
              {test.questions.map((question, index) => {
                const answerStatus = getAnswerStatus(question._id);
                const userAnswer = answerStatus.userAnswer;

                return (
                  <div
                    key={question._id}
                    className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative"
                  >
                    {answerStatus.status === 'correct' ? (
                      <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500 opacity-50" />
                    ) : answerStatus.status === 'incorrect' ? (
                      <div className="absolute top-0 right-0 w-2 h-full bg-qizil1 opacity-50" />
                    ) : null}

                    <div className="flex items-start gap-6">
                      <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-white shadow-lg ${
                        answerStatus.status === 'correct' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                        answerStatus.status === 'incorrect' ? 'bg-qizil1 shadow-qizil1/20' : 'bg-slate-400'
                      }`}>
                        {index + 1}
                      </div>

                      <div className="flex-1 space-y-6">
                        <p className="text-lg font-bold text-slate-800 leading-snug">{question.question}</p>

                        <div className="grid gap-3">
                          {Object.entries(question.variants)
                            .filter(([_, value]) => value)
                            .map(([key, value]) => {
                              const isUserAnswer = userAnswer === key;
                              const isCorrectAnswer = answerStatus.correctAnswer === key;

                              let variantStyle = "border-slate-50 bg-slate-50/50 text-slate-500";
                              if (isCorrectAnswer) variantStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-500/10";
                              else if (isUserAnswer && !isCorrectAnswer) variantStyle = "border-qizil1 bg-qizil1/5 text-qizil1 shadow-lg shadow-qizil1/10";

                              return (
                                <div
                                  key={key}
                                  className={`p-5 rounded-2xl border-2 flex items-center justify-between gap-4 transition-all ${variantStyle}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                      isCorrectAnswer ? 'border-emerald-500 bg-emerald-500' : 
                                      isUserAnswer ? 'border-qizil1 bg-qizil1' : 'border-slate-200 bg-white'
                                    }`}>
                                      {(isCorrectAnswer || isUserAnswer) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </div>
                                    <span className="text-sm font-bold">{value}</span>
                                  </div>
                                  
                                  {isCorrectAnswer && (
                                    <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-white px-2 py-1 rounded-md">Correct Answer</span>
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <span className="text-[9px] font-black uppercase tracking-widest bg-qizil1 text-white px-2 py-1 rounded-md">Your Choice</span>
                                  )}
                                </div>
                              );
                            })}
                        </div>

                        {!userAnswer && (
                          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">No Answer Provided</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}