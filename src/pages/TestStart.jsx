import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TestExamRunner from "../Components/TestRun";
import { useTestSocket } from "../hooks/useTestSocket";

const TestStart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);

  const userId = localStorage.getItem("userId"); 

  const { startTest, finishTest } = useTestSocket(userId);

  const getTestById = async () => {
    try {
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + `/api/test/get/${id}`
      );
      const data = await req.data.test;
      setTest(data);
      console.log(data);

      if (data && userId) {
        startTest(id, data.testTitle);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTestById();
  }, []);

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
    <div>
      {test && (
        <TestExamRunner
          test={test}
          onGoBack={() => {
            if (userId) {
              finishTest(id, 0, 0);
            }
            navigate(-1);
          }}
          onTestComplete={handleTestComplete}
        />
      )}
    </div>
  );
};

export default TestStart;
