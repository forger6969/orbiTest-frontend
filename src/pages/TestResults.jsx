import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CheckCircle, XCircle, Clock, Award, TrendingUp } from "lucide-react";

export default function TestResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState(null);
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Get results from localStorage or location state
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-qizil2 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate('/tests');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="font-medium">Назад</span>
              </button>
              <span className="px-3 py-1 bg-gradient-to-r from-qizil1 to-qizil2 text-white text-sm font-bold rounded-full uppercase shadow-md">
                Результаты теста
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-20">
        {/* Results Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-qizil1 to-qizil2 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Тест завершен!</h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Ваш результат</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-qizil1 to-qizil2">
                  {(() => {
                    const value = Number(results?.result?.successRate);

                    if (value === 100) return "100%";

                    return `${Math.floor(value).toString().slice(0, 2)}%`;
                  })()}
                </p>

              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Баллы</p>
                <p className="text-2xl font-bold text-qizil2">
                  {results.result?.score || 0} / {results.result?.maxScore || 0}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                <span className="font-medium">Правильно: {results.result?.correctAnswers || 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle size={20} className="text-red-500" />
                <span className="font-medium">Неправильно: {results.result?.incorrectAnswers || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        {test && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Детальные ответы</h2>

            <div className="space-y-6">
              {test.questions.map((question, index) => {
                const answerStatus = getAnswerStatus(question._id);
                const userAnswer = answerStatus.userAnswer;

                return (
                  <div
                    key={question._id}
                    className={`border-2 rounded-xl p-6 transition-all ${answerStatus.status === 'correct'
                      ? 'border-green-200 bg-green-50'
                      : answerStatus.status === 'incorrect'
                        ? 'border-qizil2 bg-qizil1/10'
                        : 'border-gray-200 bg-gray-50'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-md ${answerStatus.status === 'correct'
                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                        : answerStatus.status === 'incorrect'
                          ? 'bg-gradient-to-br from-qizil1 to-qizil2'
                          : 'bg-gradient-to-br from-gray-400 to-gray-600'
                        }`}>
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-3">{question.question}</p>

                        <div className="space-y-2">
                          {Object.entries(question.variants)
                            .filter(([key, value]) => value)
                            .map(([key, value]) => {
                              const isUserAnswer = userAnswer === key;
                              const isCorrectAnswer = answerStatus.correctAnswer === key;

                              return (
                                <div
                                  key={key}
                                  className={`p-3 rounded-lg border-2 flex items-center gap-3 ${isCorrectAnswer
                                    ? 'border-green-500 bg-green-100'
                                    : isUserAnswer && !isCorrectAnswer
                                      ? 'border-qizil2 bg-qizil1/20'
                                      : 'border-gray-200 bg-white'
                                    }`}
                                >
                                  {isCorrectAnswer && <CheckCircle size={20} className="text-green-600" />}
                                  {isUserAnswer && !isCorrectAnswer && <XCircle size={20} className="text-qizil2" />}
                                  {isUserAnswer && isCorrectAnswer && <CheckCircle size={20} className="text-green-600" />}
                                  <span className={`font-medium ${isCorrectAnswer ? 'text-green-800' :
                                    isUserAnswer && !isCorrectAnswer ? 'text-qizil2' :
                                      'text-gray-700'
                                    }`}>
                                    {value}
                                  </span>
                                  {isCorrectAnswer && <span className="ml-auto text-sm text-green-600 font-semibold">Правильный ответ</span>}
                                  {isUserAnswer && !isCorrectAnswer && <span className="ml-auto text-sm text-qizil2 font-semibold">Ваш ответ</span>}
                                  {isUserAnswer && isCorrectAnswer && <span className="ml-auto text-sm text-green-600 font-semibold">Ваш ответ ✓</span>}
                                </div>
                              );
                            })}
                        </div>

                        {!userAnswer && (
                          <div className="mt-3 p-3 bg-gray-100 rounded-lg border-2 border-gray-300">
                            <span className="text-gray-600 font-medium">Нет ответа</span>
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
