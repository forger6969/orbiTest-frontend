import axios from "axios";
import React, { useEffect, useState } from "react";
import TestsAccordion, { TestsAccordionSkeleton } from "../Components/TestAccordion";

const DashboardTests = () => {
  const [tests, setTests] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAllTests = async () => {
    try {
      setLoading(true);
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/test/all",
      );
      const data = req.data.tests;
      console.log(data);

      setTests(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTests();
  }, []);

  return (
    <div>
      {loading ? (
        <TestsAccordionSkeleton title={"Barcha testlar"} />
      ) : (
        tests && <TestsAccordion title={"Barcha testlar"} tests={tests} />
      )}
    </div>
  );
};

export default DashboardTests;
