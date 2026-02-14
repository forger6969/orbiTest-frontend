import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Chart from "chart.js";
import {
  FileText,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  Calendar,
  ChevronRight,
  UserCheck,
  Star,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";

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
  Chart.Filler
);

const DashboardHome = ({ userData }) => {
  const [chartInstance, setChartInstance] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (userData && userData.testsHistory && userData.testsHistory.length > 0) {
      const ctx = document.getElementById("testsChart");

      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = userData.testsHistory.map(
        (test) => `${test.test.testTitle}`
      );
      const scores = userData.testsHistory.map((test) => test.score);

      const newChart = new Chart.Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: t('dashboard.home.score'),
              data: scores,
              borderColor: "#ef4444",
              backgroundColor: "rgba(239, 68, 68, 0.05)",
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#fff",
              pointBorderColor: "#ef4444",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "#1e293b",
              padding: 12,
              cornerRadius: 8,
              titleFont: { size: 14, weight: "bold" },
              callbacks: {
                title: function (context) {
                  const index = context[0].dataIndex;
                  const test = userData.testsHistory[index];
                  return `${test.test.testTitle}`;
                },
                label: function (context) {
                  return `${t('dashboard.home.score')}: ${context.parsed.y}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "#f1f5f9" },
              ticks: { color: "#94a3b8", font: { size: 11 } },
            },
            x: {
              grid: { display: false },
              ticks: { color: "#94a3b8", font: { size: 11 } },
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
  }, [userData, t]);

  const getGradeBadge = (grade) => {
    const colors = {
      strongJunior: "bg-purple-50 text-purple-700 border-purple-100",
      junior: "bg-blue-50 text-blue-700 border-blue-100",
      middle: "bg-amber-50 text-amber-700 border-amber-100",
      senior: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
    return colors[grade] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  const totalTests = userData?.testsHistory?.length || 0;
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
            0
          ) / totalTests
        ).toFixed(1)
      : 0;

  const totalQuestions =
    userData?.testsHistory?.reduce(
      (acc, test) => acc + test.answers.length,
      0
    ) || 0;
  const correctAnswers =
    userData?.testsHistory?.reduce(
      (acc, test) => acc + test.answers.filter((a) => a.correct).length,
      0
    ) || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {userData ? (
        <>
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0 opacity-50" />

            <div className="relative z-10">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-2xl object-cover ring-4 ring-slate-50 shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left relative z-10">
              <h1 className="text-3xl font-black text-slate-900 mb-2">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-slate-500 font-medium mb-5 flex items-center justify-center md:justify-start gap-2">
                {userData.email}
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${getGradeBadge(userData.grade)}`}
                >
                  {userData.grade}
                </span>
                <span className="px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                  {userData.gradeExperience} {t('dashboard.home.experience')}
                </span>
                <span className="px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-qizil1/5 text-qizil1 border border-qizil1/10">
                  {userData.role.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {t('dashboard.home.totalTests')}
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {totalTests}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-qizil1/5 rounded-xl">
                  <Award className="w-6 h-6 text-qizil1" />
                </div>
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {t('dashboard.home.avgScore')}
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {averageScore}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {t('dashboard.home.successRate')}
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {averageSuccessRate}%
              </h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {t('dashboard.home.answers')}
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {correctAnswers}/{totalQuestions}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-qizil1" />
                  {t('dashboard.home.performance')}
                </h2>
              </div>
              <div className="h-80">
                <canvas id="testsChart"></canvas>
              </div>
            </div>

            {/* Recent Activity / Test History Sidebar */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-qizil1" />
                {t('dashboard.home.history')}
              </h2>
              <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin">
                {userData.testsHistory &&
                  userData.testsHistory.map((test) => (
                    <div
                      key={test._id}
                      className="group relative pl-6 border-l-2 border-slate-100 hover:border-qizil1 transition-colors pb-2"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover:border-qizil1 transition-colors" />
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {test.test.testTitle}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 font-medium">
                        {new Date(test.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-bold text-qizil1 bg-qizil1/5 px-2 py-0.5 rounded-lg border border-qizil1/10">
                          {test.score} {t('dashboard.home.score').toLowerCase()}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                          {test.successRate.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                {(!userData.testsHistory ||
                  userData.testsHistory.length === 0) && (
                  <div className="text-center py-10">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-sm text-slate-400">{t('dashboard.home.noTests')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (

        /* Enhanced Skeleton */
        <div className="space-y-8 animate-pulse">
          <div className="h-48 bg-white rounded-2xl border border-slate-200/60" />
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-white rounded-2xl border border-slate-200/60"
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 h-96 bg-white rounded-2xl border border-slate-200/60" />
            <div className="h-96 bg-white rounded-2xl border border-slate-200/60" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
