import React from "react";
import { Clock, HelpCircle, Play, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

// Skeleton Component
function TestCardSkeleton() {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-5">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 flex-1">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>
          </div>
          
          <div className="shrink-0">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestsAccordionSkeleton({ title }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-48 mb-6"></div>
      
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="flex gap-3 mt-2">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded-xl animate-pulse w-full md:w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function TestsAccordion({ title, tests = [] }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          {title}
        </h2>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
          {tests.length} tests available
        </span>
      </div>

      <div className="grid gap-5">
        {tests.map((test) => (
          <TestCard key={test._id} test={test} />
        ))}
      </div>
    </div>
  );
}

function TestCard({ test }) {
  const gradeColor = {
    junior: "bg-emerald-100 text-emerald-700 border-emerald-200",
    strongJunior: "bg-teal-100 text-teal-700 border-teal-200",
    middle: "bg-blue-100 text-blue-700 border-blue-200",
    strongMiddle: "bg-indigo-100 text-indigo-700 border-indigo-200",
    senior: "bg-purple-100 text-purple-700 border-purple-200",
  }[test.testGrade] || "bg-gray-100 text-gray-700 border-gray-200";

  const minutes = Math.round((test.testTime || 0) / 60000);

  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-qizil1/20 transition-all duration-300 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-full -z-0 opacity-50 group-hover:from-qizil1/5 group-hover:to-qizil2/5 transition-all duration-300" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-start justify-between md:justify-start gap-4">
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-qizil2 transition-colors">
              {test.testTitle}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${gradeColor} md:hidden`}>
              {test.testGrade}
            </span>
          </div>
          
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 max-w-xl">
            {test.testDescribe}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className={`hidden md:inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${gradeColor}`}>
              {test.testGrade}
            </span>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <HelpCircle size={16} className="text-gray-400" /> 
                {test.questionsCount} questions
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-gray-400" /> 
                {minutes} min
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 size={16} className="text-gray-400" /> 
                max {test.maxScore}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto mt-2 md:mt-0 shrink-0">
           <Link 
             to={`/test/${test._id}`} 
             className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-qizil1 hover:bg-qizil2 text-white font-semibold rounded-xl shadow-lg shadow-qizil1/20 hover:shadow-qizil1/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
           >
              <Play size={18} fill="currentColor" />
              Boshlash
            </Link>
        </div>
      </div>
    </div>
  );
}

export { TestsAccordionSkeleton };