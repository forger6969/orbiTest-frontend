import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Chart from "chart.js";

// Register Chart.js components
Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.PointElement,
  Chart.LineElement,
  Chart.LineController,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.Filler,
);

const DashboardHome = ({ userData }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (userData && userData.testsHistory && userData.testsHistory.length > 0) {
      const ctx = document.getElementById("testsChart");

      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = userData.testsHistory.map(
        (test, index) => `${test.test.testTitle}`,
      );
      const scores = userData.testsHistory.map((test) => test.score);
      const successRates = userData.testsHistory.map(
        (test) => test.successRate,
      );

      const newChart = new Chart.Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Score",
              data: scores,
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
              fill: true,
              yAxisID: "y",
            },
            {
              label: "Success Rate (%)",
              data: successRates,
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
              fill: true,
              yAxisID: "y1",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              callbacks: {
                title: function (context) {
                  const index = context[0].dataIndex;
                  const test = userData.testsHistory[index];
                  return `${test.test.testTitle} - ${new Date(test.createdAt).toLocaleDateString()}`;
                },
                afterTitle: function (context) {
                  const index = context[0].dataIndex;
                  const test = userData.testsHistory[index];
                  const correctAnswers = test.answers.filter(
                    (a) => a.correct,
                  ).length;
                  const totalQuestions = test.answers.length;
                  return `Correct: ${correctAnswers}/${totalQuestions}`;
                },
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label +=
                      context.dataset.label === "Success Rate (%)"
                        ? context.parsed.y.toFixed(2) + "%"
                        : context.parsed.y;
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            y: {
              type: "linear",
              display: true,
              position: "left",
              title: {
                display: true,
                text: "Score",
              },
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              title: {
                display: true,
                text: "Success Rate (%)",
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
      });

      setChartInstance(newChart);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [userData]);

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      user: "bg-blue-100 text-blue-800",
      teacher: "bg-green-100 text-green-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getGradeBadge = (grade) => {
    const colors = {
      strongJunior: "bg-purple-100 text-purple-800",
      junior: "bg-indigo-100 text-indigo-800",
      middle: "bg-blue-100 text-blue-800",
      senior: "bg-green-100 text-green-800",
    };
    return colors[grade] || "bg-gray-100 text-gray-800";
  };

  const formatGrade = (grade) => {
    const gradeMap = {
      strongJunior: "Strong Junior",
      junior: "Junior",
      middle: "Middle",
      senior: "Senior",
    };
    return gradeMap[grade] || grade;
  };

  const totalTests = userData?.testsHistory.length || 0;
  const averageScore =
    totalTests > 0
      ? (
          userData?.testsHistory.reduce((acc, test) => acc + test.score, 0) /
          totalTests
        ).toFixed(1)
      : 0;
  const averageSuccessRate =
    totalTests > 0
      ? (
          userData?.testsHistory.reduce(
            (acc, test) => acc + test.successRate,
            0,
          ) / totalTests
        ).toFixed(2)
      : 0;
  const totalQuestions =
    userData?.testsHistory.reduce(
      (acc, test) => acc + test.answers.length,
      0,
    ) || 0;
  const correctAnswers =
    userData?.testsHistory.reduce(
      (acc, test) => acc + test.answers.filter((a) => a.correct).length,
      0,
    ) || 0;

  return (
    <>
      {userData ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-500 shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {userData.username}
                  </h1>
                  <p className="text-gray-600 mb-3">{userData.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getRoleBadge(userData.role)}`}
                    >
                      {userData.role.toUpperCase()}
                    </span>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getGradeBadge(userData.grade)}`}
                    >
                      {formatGrade(userData.grade)}
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                      {userData.gradeExperience} Year
                      {userData.gradeExperience !== 1 ? "s" : ""} Experience
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Tests
                    </p>
                    <p className="text-4xl font-bold mt-2">{totalTests}</p>
                  </div>
                  <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      Average Score
                    </p>
                    <p className="text-4xl font-bold mt-2">{averageScore}</p>
                  </div>
                  <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Success Rate
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {averageSuccessRate}%
                    </p>
                  </div>
                  <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">
                      Correct Answers
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {correctAnswers}/{totalQuestions}
                    </p>
                  </div>
                  <div className="bg-orange-400 bg-opacity-30 rounded-full p-3">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Performance Over Time
              </h2>
              <div className="h-80">
                <canvas id="testsChart"></canvas>
              </div>
            </div>

            {/* Test History */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Test History
              </h2>
              <div className="space-y-4">
                {userData.testsHistory &&
                  userData.testsHistory.map((test, index) => {
                    const correctCount = test.answers.filter(
                      (a) => a.correct,
                    ).length;
                    const totalCount = test.answers.length;
                    const date = new Date(test.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    );

                    return (
                      <div
                        key={test._id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {test.test.testTitle}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">{date}</p>
                            <div className="flex flex-wrap gap-3">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                Score: {test.score}
                              </span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Success: {test.successRate.toFixed(2)}%
                              </span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                Correct: {correctCount}/{totalCount}
                              </span>
                            </div>
                          </div>
                          <div className="w-full md:w-48">
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div className="text-xs font-semibold text-gray-600">
                                  Progress
                                </div>
                                <div className="text-xs font-semibold text-gray-600">
                                  {((correctCount / totalCount) * 100).toFixed(
                                    0,
                                  )}
                                  %
                                </div>
                              </div>
                              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                                <div
                                  style={{
                                    width: `${(correctCount / totalCount) * 100}%`,
                                  }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 to-green-600"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-auto  flex justify-center "> 
          <div className="flex flex-col mx-auto max-w-full min-h-screen">
            <div className="flex w-fit flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-32 w-32 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-34"></div>
                  <div className="skeleton h-4 w-20"></div>

                  <div className="flex items-center gap-4">
                    <div className="skeleton h-8 w-[100px] rounded-full"></div>
                    <div className="skeleton h-8 w-[170px] rounded-full"></div>
                    <div className="skeleton h-8 w-[200px] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-[30px]">
              <div className="skeleton h-[115px] w-[300px] rounded-2xl"></div>
              <div className="skeleton h-[115px] w-[300px] rounded-2xl"></div>
              <div className="skeleton h-[115px] w-[300px] rounded-2xl"></div>
              <div className="skeleton h-[115px] w-[300px] rounded-2xl"></div>
            </div>

            <div className="skeleton w-full mt-5 h-[400px] rounded-2xl"></div>
          </div>
          </div>
      )}
    </>
  );
};

export default DashboardHome;
