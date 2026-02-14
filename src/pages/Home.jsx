import React from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import DotGrid from "../Components/DotGrid";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.svg";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Orqa fon */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
      >
        <DotGrid
          dotSize={1.5}
          gap={15}
          baseColor="#d9d7d9"
          activeColor="#dc2626"
          proximity={120}
          shockRadius={100}
          shockStrength={15}
          resistance={950}
          returnDuration={1.5}
        />
      </div>

      <div
        style={{
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          zIndex: 10,
        }}
      >
        <Header />
      </div>

      <main style={{ position: "relative", zIndex: 1 }} className="pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
            {t("home.title")}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {t("home.subtitle")}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/SingUp"
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
            >
              {t("home.getStarted")}
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-bold text-lg hover:border-gray-400 transition-colors bg-white/50">
              {t("home.learnMore")}
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white border-y border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-red-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600 font-medium">
                  {t("home.stats.centers")}
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-red-600 mb-2">
                  10k+
                </div>
                <div className="text-gray-600 font-medium">
                  {t("home.stats.students")}
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-red-600 mb-2">
                  1M+
                </div>
                <div className="text-gray-600 font-medium">
                  {t("home.stats.tests")}
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-red-600 mb-2">
                  99%
                </div>
                <div className="text-gray-600 font-medium">
                  {t("home.stats.satisfaction")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t("home.features.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {t("home.features.realTime")}
                </h3>
                <p className="text-gray-600">
                  {t("home.features.realTimeDesc")}
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {t("home.features.analytics")}
                </h3>
                <p className="text-gray-600">
                  {t("home.features.analyticsDesc")}
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {t("home.features.vastBank")}
                </h3>
                <p className="text-gray-600">
                  {t("home.features.vastBankDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16">
              {t("home.howItWorks.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative group">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t("home.howItWorks.step1")}
                </h3>
                <p className="text-gray-500">
                  {t("home.howItWorks.step1Desc")}
                </p>
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 -z-10 translate-x-1/2"></div>
              </div>
              <div className="relative group">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t("home.howItWorks.step2")}
                </h3>
                <p className="text-gray-500">
                  {t("home.howItWorks.step2Desc")}
                </p>
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 -z-10 translate-x-1/2"></div>
              </div>
              <div className="relative group">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t("home.howItWorks.step3")}
                </h3>
                <p className="text-gray-500">
                  {t("home.howItWorks.step3Desc")}
                </p>
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 -z-10 translate-x-1/2"></div>
              </div>
              <div className="relative group">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t("home.howItWorks.step4")}
                </h3>
                <p className="text-gray-500">
                  {t("home.howItWorks.step4Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CRM Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t("home.crm.title")}
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                {t("home.crm.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-red-600 rounded-xl flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("home.crm.feature1")}
                    </h3>
                    <p className="text-slate-400">
                      {t("home.crm.feature1Desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-red-600 rounded-xl flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("home.crm.feature2")}
                    </h3>
                    <p className="text-slate-400">
                      {t("home.crm.feature2Desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-red-600 rounded-xl flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("home.crm.feature3")}
                    </h3>
                    <p className="text-slate-400">
                      {t("home.crm.feature3Desc")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex items-center justify-center">
                  <span className="text-slate-500 italic">
                    CRM Dashboard Preview
                  </span>
                  {/* Можно добавить скриншот или иллюстрацию здесь */}
                </div>
                <div className="absolute -bottom-6 -left-6 bg-red-600 p-6 rounded-2xl shadow-xl hidden lg:block">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm opacity-80">Automation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              {t("home.feedback.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm relative">
                <div className="text-red-600 mb-6 text-4xl">""</div>
                <p className="text-lg text-gray-700 mb-8 italic">
                  {t("home.feedback.user1.text")}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {t("home.feedback.user1.name")}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {t("home.feedback.user1.role")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm relative">
                <div className="text-red-600 mb-6 text-4xl">""</div>
                <p className="text-lg text-gray-700 mb-8 italic">
                  {t("home.feedback.user2.text")}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {t("home.feedback.user2.name")}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {t("home.feedback.user2.role")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("home.faq.title")}
            </h2>
            <div className="space-y-6">
              <div className="collapse collapse-plus bg-base-200 rounded-xl">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  {t("home.faq.q1")}
                </div>
                <div className="collapse-content">
                  <p>{t("home.faq.a1")}</p>
                </div>
              </div>
              <div className="collapse collapse-plus bg-base-200 rounded-xl">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                  {t("home.faq.q2")}
                </div>
                <div className="collapse-content">
                  <p>{t("home.faq.a2")}</p>
                </div>
              </div>
              <div className="collapse collapse-plus bg-base-200 rounded-xl">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                  {t("home.faq.q3")}
                </div>
                <div className="collapse-content">
                  <p>{t("home.faq.a3")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 mb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-700 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-red-200">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("home.title")}
            </h2>
            <p className="text-xl mb-10 opacity-90">{t("home.subtitle")}</p>
            <Link
              to="/SingUp"
              className="inline-block bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg"
            >
              {t("home.getStarted")}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-[#0a0c10] text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="text-white text-3xl font-bold mb-6 flex items-center gap-2">
                <img src={logo} alt="" />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                © {new Date().getFullYear()} OrbiTest. {t("home.footer.rights")}
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-bold">TG</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-bold">IG</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-bold">FB</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">
                {t("home.footer.product")}
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    {t("header.features")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    {t("header.pricing")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Practice Tests
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">
                {t("home.footer.company")}
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    {t("header.about")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">
                {t("home.footer.contact")}
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-red-600">@</span>
                  <a
                    href="mailto:support@orbitest.uz"
                    className="hover:text-white transition-colors"
                  >
                    saidazim186@orbitest.uz
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-600">#</span>
                  <a
                    href="tel:+998901234567"
                    className="hover:text-white transition-colors"
                  >
                    +998 93 315 03 42
                  </a>
                </li>
                <li className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Toshkent sh., Yunusobod tumani, <br /> Аmir Temur ko'chasi,
                  108
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs tracking-widest uppercase text-slate-500">
              Made with <span className="text-red-600 mx-1">❤️</span> in
              Uzbekistan
            </div>
            <div className="flex gap-8 text-xs text-slate-500">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">
                Terms of Service
              </span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
