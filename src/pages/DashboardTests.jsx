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
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-2 text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Available Tests</h1>
        <p className="text-slate-500 font-medium mt-1">Choose a test to evaluate your current knowledge level.</p>
      </div>

      <div className="relative">
        {loading ? (
          <TestsAccordionSkeleton title={"Loading tests..."} />
        ) : (
          tests && <TestsAccordion title={"All Tests"} tests={tests} />
        )}
      </div>
    </div>
  );
};

export default DashboardTests;
