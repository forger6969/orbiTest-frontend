import axios from "axios";
import React, { useEffect, useState } from "react";
import TestsAccordion from "../Components/TestAccordion";

const DashboardTests = () => {
  const [tests, setTests] = useState(null);

  const getAllTests = async () => {
    try {
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/test/all",
      );
      const data = req.data.tests;
      console.log(data);

      setTests(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTests();
  }, []);

  return (

    <div>

      {tests && <TestsAccordion title={"Barcha testlar"} tests={tests}/>}
     
    </div>
  );
};

export default DashboardTests;
