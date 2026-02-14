import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TestExamRunner from "../Components/TestRun";
import { useTestSocket } from "../hooks/useTestSocket";

const TestStart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Получаем userId из localStorage или контекста
  const userId = localStorage.getItem("userId"); // или из вашего auth контекста

  // Подключаем socket
  const { startTest, finishTest } = useTestSocket(userId);

  const getTestById = async () => {
    try {
      setLoading(true);
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + `/api/test/get/${id}`
      );
      const data = await req.data.test;
      setTest(data);
      console.log(data);

      // ВАЖНО: Уведомляем менторов что студент начал тест
      if (data && userId) {
        startTest(id, data.testTitle);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestById();
  }, []);

  // При выходе со страницы - уведомляем о завершении
  useEffect(() => {
    return () => {
      if (test && userId) {
        console.log("Leaving test page, notifying mentors...");
        finishTest(id, 0, 0);
      }
    };
  }, [test, id, userId]);

  const handleTestComplete = (score, successRate) => {
    // Уведомляем менторов о завершении теста
    if (userId) {
      finishTest(id, score, successRate);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 rounded-full" />
            <div className="w-20 h-20 border-4 border-qizil1 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] animate-pulse mb-2">
              Loading Test
            </p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Please wait while we prepare your session
            </p>
          </div>
        </div>
      ) : test ? (
        <TestExamRunner
          test={test}
          onGoBack={() => {
            // При выходе уведомляем менторов
            if (userId) {
              finishTest(id, 0, 0);
            }
            navigate(-1);
          }}
          onTestComplete={handleTestComplete}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl font-bold text-qizil1">Test topilmadi</p>
        </div>
      )}
    </div>
  );
};

export default TestStart;
