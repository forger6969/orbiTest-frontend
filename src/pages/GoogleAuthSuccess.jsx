// src/pages/GoogleAuthSuccess.jsx
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showToast } from "../helper/ShowToast";

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const isProfileComplete = searchParams.get("isProfileComplete") === "true";
    const userId = searchParams.get("id");

    if (!token) {
      showToast("Authentication failed", "error");
      navigate("/Register");
      return;
    }

    // Сохраняем токен
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    // ✅ Проверяем, завершен ли профиль
    if (!isProfileComplete) {
      // Перенаправляем на страницу завершения регистрации
      navigate("/complete-profile");
    } else {
      // Профиль уже завершен, идем в Dashboard
      showToast("Login successful", "success");
      navigate("/dashboard");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[#e5e7eb5c] flex justify-center items-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-qizil1 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-700">
          Completing authentication...
        </p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
