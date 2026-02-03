import React, { useState } from "react";
import { Clock, Lock, ChevronLeft, Bookmark, AwardIcon } from "lucide-react";
import axios from "axios";
import { data, useNavigate, Link } from "react-router-dom";
import { useTestSocket } from "../hooks/useTestSocket";

/**
 * TestExamRunner
 * Props:
 *  test – объект Test из backend (mongoose schema)
 */
export default function TestExamRunner({ test }) {
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(test.testTime); // milliseconds
  const [isRunning, setIsRunning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const mess = JSON.parse(localStorage.getItem("mssage"));

  // Получаем userId и подключаем socket
  const userId = localStorage.getItem("userId");
  const { startTest, finishTest } = useTestSocket(userId);

  // При монтировании компонента - уведомляем что студент начал тест
  React.useEffect(() => {
    if (test && userId) {
      console.log("🎯 Student started test:", test.testTitle);
      startTest(test._id, test.testTitle);
    }

    // При размонтировании - уведомляем что студент вышел
    return () => {
      if (test && userId) {
        console.log("👋 Student left test");
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
          alert("Время истекло!");
          handleAutoSubmit(); // Автоматически отправляем при истечении времени
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
      console.log(answers);
      const token = localStorage.getItem("token");
      const req = await axios.post(
        import.meta.env.VITE_BACKEND_API + "/api/test/result",
        {
          answers,
          testId: test._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await req.data;
      console.log(data);

      localStorage.setItem("mssage", JSON.stringify(req.data));

      // ВАЖНО: Уведомляем менторов о завершении теста
      if (userId && data.result) {
        console.log("✅ Notifying mentors - test finished");
        finishTest(test._id, data.result.score, data.result.successRate);
      }

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleAutoSubmit = async () => {
    // Автоматическая отправка при истечении времени
    if (!loading) {
      await handleFinishClick();
    }
  };

  const handleFinishClick = async () => {
    setLoading(true);
    try {
      await endTest();
      setOpenModal(true);
    } catch (error) {
      console.error("Error finishing test:", error);
      alert("Ошибка при отправке результатов");
    } finally {
      setLoading(false);
    }
  };

  const Modalandnavi = async () => {
    setOpenModal(false);
    navigate("/test-results", {
      state: {
        results: mess,
        test: test,
        answers: answers,
      },
    });
  };

  // Предупреждение при попытке выйти со страницы
  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (answers.length > 0 && !openModal) {
        e.preventDefault();
        e.returnValue =
          "Вы уверены, что хотите покинуть тест? Прогресс будет потерян.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answers.length, openModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => {
                  if (
                    window.confirm("Вы уверены, что хотите выйти из теста?")
                  ) {
                    // Уведомляем о выходе
                    if (userId) {
                      finishTest(test._id, 0, 0);
                    }
                    navigate("/dashboard/tests");
                  }
                }}
              >
                <ChevronLeft size={20} />
                <span className="font-medium">Back</span>
              </button>
              <span className="px-3 py-1 bg-gradient-to-r from-qizil1 to-qizil2 text-white text-sm font-bold rounded-full uppercase shadow-md">
                {test.testType}
              </span>
              <span className="text-gray-500 font-mono text-sm">
                ID: {test._id?.slice(-6) || "16736"}
              </span>

              {/* Индикатор онлайн статуса */}
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                В процессе
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  timeLeft < 60000
                    ? "bg-qizil1/20 text-qizil2 font-bold animate-pulse"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <Clock size={18} />
                <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-r from-white to-blue-50 border border-blue-200 rounded-xl p-6 shadow-lg">
          <h2 className="font-bold text-xl text-gray-800 mb-2">Part 1</h2>
          <p className="text-gray-600">
            Read the text and answer questions 1-{test.questions.length}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-20">
        <div className="flex gap-6">
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 relative overflow-hidden min-h-[600px]">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/85 z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Lock size={32} className="text-white" />
              </div>
              <p className="text-xl font-bold text-gray-800 mb-2">
                Скоро будет доступно
              </p>
              <p className="text-gray-600">Этот раздел ещё недоступен</p>
            </div>

            <div className="p-6 select-none overflow-y-auto h-full">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {test.testTitle}
              </h3>
              <div className="prose prose-sm text-gray-600 leading-relaxed">
                <p>{test.testDescribe}</p>
                <p className="mt-4">
                  During the journey from our hunter-gatherer ancestors to the
                  present day, there have been three seismic changes that have
                  impacted the food we eat: the discovery of cooking, the
                  emergence of agriculture, and the invention of methods of
                  preserving food.
                </p>
                <p className="mt-4">
                  The 19th-century scientist Charles Darwin thought that
                  cooking, after language, was the greatest discovery made by
                  man. All of us eat some raw food, such as fruit and
                  vegetables, but the great majority of food we consume is
                  cooked.
                </p>
                <p className="mt-4">
                  Cooking can turn plants that are inedible into edible food by
                  destroying toxic chemicals that plants often manufacture to
                  protect themselves against attack by insects or other
                  herbivorous animals.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE  */}
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-y-auto max-h-[800px]">
            <div className="p-6 sticky top-0 bg-white  border-b-2 border-qizil2 z-10">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Questions 1-{test.questions.length}
              </h3>
            </div>

            <div className="p-6 space-y-8">
              {test.questions.map((question, index) => {
                const selectedAnswer = getSelectedAnswer(question._id);

                return (
                  <div
                    key={question._id}
                    className="pb-8 border-b border-gray-200 last:border-b-0 hover:bg-gradient-to-r hover:from-qizil1/5 hover:to-qizil2/5 -mx-4 px-4 py-4 rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-qizil1 to-qizil2 rounded-lg flex items-center justify-center font-bold text-white shadow-md">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed mb-1 font-medium text-base">
                          {question.question}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-qizil2 transition-colors p-2 rounded-lg hover:bg-qizil1/10">
                        <Bookmark size={18} />
                      </button>
                    </div>

                    {/* Answer Options */}
                    <div className="ml-12 space-y-3">
                      {Object.entries(question.variants)
                        .filter(([key, value]) => value) // Фильтруем пустые варианты
                        .map(([key, value]) => (
                          <label
                            key={key}
                            className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                              selectedAnswer === key
                                ? "border-qizil2 bg-gradient-to-r from-qizil1/10 to-qizil2/10 shadow-md transform scale-105"
                                : "border-gray-200 hover:border-qizil1 hover:bg-qizil1/5 hover:shadow-sm"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              className="w-5 h-5 text-qizil2 border-gray-300  "
                              checked={selectedAnswer === key}
                              onChange={() => handleSelect(question._id, key)}
                            />
                            <span className="text-gray-700 font-medium">
                              {value}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/*  Progress  */}
            <div className="p-6 bg-white to-qizil2/30 border-t border-qizil1/20 sticky bottom-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Progress:{" "}
                  <span className="text-qizil2 font-bold">
                    {answers.length}
                  </span>{" "}
                  / {test.questions.length} answered
                </span>
                <div className="flex-1 max-w-xs mx-4">
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-qizil1 to-qizil2 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(answers.length / test.questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-700">
                  {Math.round((answers.length / test.questions.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Navigation  */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-2xl z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 py-4">
            <span className="text-sm font-semibold text-gray-600 px-3 py-1 bg-gray-100 rounded-full">
              Part 1
            </span>
            {test.questions.map((question, index) => {
              const isAnswered = answers.some(
                (a) => a.questionId === question._id
              );

              return (
                <button
                  key={index}
                  onClick={() => {
                    const element = document.querySelector(
                      `input[name="question-${question._id}"]`
                    );
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                  className={`w-10 h-10 rounded-lg font-bold transition-all duration-200 transform hover:scale-110 ${
                    isAnswered
                      ? "bg-gradient-to-br from-qizil1 to-qizil2 text-white border-2 border-qizil1/50 shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
            <button
              className="ml-6 bg-gradient-to-r from-qizil1 to-qizil2 hover:from-qizil2 hover:to-qizil1 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleFinishClick}
              disabled={loading || answers.length === 0}
            >
              {loading ? "Yuborilmoqda..." : "Завершить"}
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all animate-in fade-in zoom-in duration-200">
            {/* Success Icon */}
            <div className="flex justify-center pt-8 pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="px-8 pb-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Test muvaffaqiyatli yakunlandi!
              </h2>

              <div className="bg-gradient-to-r from-qizil1/5 to-qizil2/5 rounded-xl p-6 mb-6 border border-qizil1/20">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Sizning natijangiz:
                  </p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-qizil1 to-qizil2">
                    {(() => {
                      const value = Number(mess?.result?.successRate);

                      if (value === 100) return "100%";

                      return `${Math.floor(value).toString().slice(0, 2)}%`;
                    })()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={Modalandnavi}
                  className="flex-1 bg-gradient-to-r from-qizil1 to-qizil2 hover:from-qizil2 hover:to-qizil1 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Посмотреть результаты
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
