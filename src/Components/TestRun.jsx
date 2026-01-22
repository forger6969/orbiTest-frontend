import React, { useState } from "react";
import { Clock, Lock, ChevronLeft, Bookmark, AwardIcon } from "lucide-react";
import axios from "axios";

/**
 * TestExamRunner
 * Props:
 *  test – объект Test из backend (mongoose schema)
 */
export default function TestExamRunner({ test }) {
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(test.testTime); // milliseconds
  const [isRunning, setIsRunning] = useState(true);

  // Timer effect
  React.useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          setIsRunning(false);
          alert("Время истекло!");
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Format time as MM:SS
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
          a.questionId === questionId ? { ...a, answer } : a,
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
      const token = localStorage.getItem("token")
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
        },
      );

      const data = await req.data
      console.log(data);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded uppercase">
                {test.testType}
              </span>
              <span className="text-gray-500">ID: {test._id || "16736"}</span>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 ${timeLeft < 60000 ? "text-red-600 font-bold" : "text-gray-600"}`}
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
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <h2 className="font-bold text-gray-800">Part 1</h2>
          <p className="text-gray-600 text-sm">
            Read the text and answer questions 1-{test.questions.length}.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-20">
        <div className="flex gap-6">
          {/* LEFT SIDE - Reading Text (Blurred/Locked) */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border relative overflow-hidden min-h-[600px]">
            {/* Blur Overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/80 z-10 flex flex-col items-center justify-center">
              <Lock size={48} className="text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Скоро будет доступно
              </p>
              <p className="text-sm text-gray-500">
                Этот раздел ещё недоступен
              </p>
            </div>

            {/* Content (blurred underneath) */}
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

          {/* RIGHT SIDE - All Questions */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border overflow-y-auto max-h-[800px]">
            <div className="p-6 sticky top-0 bg-white border-b z-10">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Questions 1-{test.questions.length}
              </h3>
              <p className="text-sm text-gray-600">
                Choose <span className="font-semibold">TRUE</span> if the
                statement agrees with the information given in the text, choose{" "}
                <span className="font-semibold">FALSE</span> if the statement
                contradicts the information, or choose{" "}
                <span className="font-semibold">NOT GIVEN</span> if there is no
                information on this.
              </p>
            </div>

            {/* All Questions List */}
            <div className="p-6 space-y-8">
              {test.questions.map((question, index) => {
                const selectedAnswer = getSelectedAnswer(question._id);

                return (
                  <div
                    key={question._id}
                    className="pb-8 border-b last:border-b-0"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-700">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed mb-1">
                          {question.question}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Bookmark size={18} />
                      </button>
                    </div>

                    {/* Answer Options */}
                    <div className="ml-11 space-y-3">
                      {Object.entries(question.variants)
                        .filter(([key, value]) => value) // Фильтруем пустые варианты
                        .map(([key, value]) => (
                          <label
                            key={key}
                            className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedAnswer === key
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500"
                              checked={selectedAnswer === key}
                              onChange={() => handleSelect(question._id, key)}
                            />
                            <span className="text-gray-700">{value}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Progress Section */}
            <div className="p-6 bg-gray-50 border-t sticky bottom-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  Progress: {answers.length} / {test.questions.length} answered
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 py-3">
            <span className="text-sm text-gray-600">Part 1</span>
            {test.questions.map((question, index) => {
              const isAnswered = answers.some(
                (a) => a.questionId === question._id,
              );

              return (
                <button
                  key={index}
                  onClick={() => {
                    const element = document.querySelector(
                      `input[name="question-${question._id}"]`,
                    );
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                  className={`w-10 h-10 rounded font-semibold transition-all ${
                    isAnswered
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
            <button
              className="ml-4 text-green-600 hover:text-green-700"
              onClick={endTest}
            >
              Завершить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
