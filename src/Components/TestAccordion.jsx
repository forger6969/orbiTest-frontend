import React from "react";
import { Clock, HelpCircle, Play, RotateCcw, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";


export default function TestsAccordion({ title, tests = [], defaultOpen = true }) {
  return (
    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
      <input type="checkbox" defaultChecked={defaultOpen} />

      <div className="collapse-title text-xl font-semibold flex items-center gap-2">
        {title}
        <span className="text-sm font-normal opacity-60">
          {tests.length} tests
        </span>
      </div>

      <div className="collapse-content space-y-4">
        {tests.map((test) => (
          <TestCard key={test._id} test={test} />
        ))}
      </div>
    </div>
  );
}

function TestCard({ test }) {
  const gradeColor = {
    junior: "bg-green-400",            // light blue
    strongJunior: "bg-green-600",   // green
    middle: "bg-yellow-500",         // yellow
    strongMiddle: "bg-red-500", // purple
    senior: "bg-red-600",           // red
  }[test.testGrade];

  const minutes = Math.round((test.testTime || 0) / 60000);

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-5">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{test.testTitle}</h3>
            <p className="text-sm opacity-70">{test.testDescribe}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm opacity-80">
              <span className={`badge ${gradeColor}`}>{test.testGrade}</span>
              <span className="flex items-center gap-1">
                <HelpCircle size={16} /> {test.questionsCount} questions
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {minutes} min
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 size={16} /> max {test.maxScore} pts
              </span>
            </div>
          </div>

          <div className="shrink-0">
             <Link to={`/test/${test._id}`} className="btn bg-red-500 btn-sm text-white flex gap-2">
                <Play size={16} />
                Start
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Example usage:

<TestsAccordion
  title="Reading Challenge"
  tests={testsFromBackend}
/>

   testsFromBackend – массив документов Test
   (questionsCount и maxScore приходят как virtuals)
========================= */
