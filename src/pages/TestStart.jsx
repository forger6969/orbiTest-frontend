import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TestExamRunner from "../Components/TestRun";

const TestStart = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  const getTestById = async () => {
    try {
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + `/api/test/get/${id}`,
      );
      const data = await req.data.test;
      setTest(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTestById();
  }, []);

  const navigate = useNavigate();

  return <div>
    {test && (
      <TestExamRunner
        test={test}
        onGoBack={() => navigate(-1)}
      />
    )}
  </div>
};

export default TestStart;
