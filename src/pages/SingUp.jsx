import React, { useState, useMemo, useEffect } from "react";
import Stepper, { Step } from "../Components/Stepper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../helper/ShowToast";

const SingUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    groupID: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState(null);
  const navigate = useNavigate();

  const getGroups = async () => {
    try {
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/group/all",
      );
      const data = await req.data;
      setGroups(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    Object.values(checks).forEach((check) => {
      if (check) strength++;
    });

    return {
      score: strength,
      checks,
      isStrong: strength >= 4 && password.length >= 8,
    };
  };

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password],
  );

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return formData.username.trim().length > 0;
      case 2:
        return validateEmail(formData.email);
      case 3:
        return passwordStrength.isStrong;
      case 4:
        return formData.groupID !== "";
      default:
        return false;
    }
  }, [currentStep, formData, passwordStrength]);

  const handleComplete = async () => {};

  const handleFinalSubmit = async () => {
    try {
      setIsLoading(true);

      const req = await axios.post(
        import.meta.env.VITE_BACKEND_API + "/api/auth/register",
        formData,
      );
      showToast("Успешная регистрация" , "success")

      navigate("/Register");
    } catch (err) {
      console.log(err);
      showToast("Ошибка регистрации попробуйте заново" , "error")
    } finally {
      setIsLoading(false);
    }
  };

  const getOptionLabel = (value) => {
    const options = {
      option1: "Опция 1",
      option2: "Опция 2",
      option3: "Опция 3",
    };
    return options[value] || value;
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="min-h-screen bg-[#e5e7eb5c] relative">
      {/* Кнопка "Back to home" */}
      <button
        onClick={() => window.history.back()}
        className="
          flex items-center gap-2.5 text-gray-700 text-base font-medium
          fixed top-6 left-6
          group cursor-pointer 
          bg-white shadow-lg
          px-6 py-3.5
          rounded-xl
          transition-all duration-300
          hover:bg-red-500
          hover:text-white
          hover:shadow-xl
          hover:scale-105
          active:scale-95
          z-50
        "
      >
        <svg
          className="w-4 h-auto transition-transform duration-300 group-hover:-translate-x-1 fill-current"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" />
        </svg>
        Back 
      </button>

      <Stepper
        initialStep={1}
        canProceed={canProceed}
        isLoading={isLoading}
        onStepChange={(step) => {
          setCurrentStep(step);
        }}
        onFinalStepCompleted={handleComplete}
        backButtonText="Назад"
        nextButtonText="Далее"
      >
        {/* Шаг 1: Имя пользователя */}
        <Step>
          <div className="space-y-6 pt-8 px-[30px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Создайте аккаунт
              </h2>
              <p className="text-gray-500 text-lg">
                Начните с вашего имени пользователя
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label
                className="font-semibold text-gray-800 text-base"
                htmlFor="username"
              >
                Имя пользователя
              </label>
              <input
                placeholder="Введите имя пользователя"
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`w-full h-14 rounded-xl px-5 text-base font-medium border-2 focus:outline-none transition-all duration-200 ${
                  formData.username.trim().length > 0
                    ? "border-green-500 focus:border-green-600 text-green-600 bg-green-50/30"
                    : "border-gray-300 focus:border-red-500 text-gray-700 bg-white"
                }`}
                type="text"
                autoComplete="off"
              />
              {formData.username.trim().length === 0 ? (
                <p className="text-sm text-gray-500 ml-1">
                  Введите имя пользователя
                </p>
              ) : (
                <p className="text-sm text-green-600 flex items-center gap-2 font-semibold ml-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Отлично!
                </p>
              )}
            </div>
          </div>
        </Step>

        {/* Шаг 2: Email */}
        <Step>
          <div className="space-y-6 px-[30px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Ваш email
              </h2>
              <p className="text-gray-500 text-lg">
                Укажите действующий email адрес
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label
                className="font-semibold text-gray-800 text-base"
                htmlFor="email"
              >
                Email
              </label>
              <input
                placeholder="your@gmail.com"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full h-14 rounded-xl px-5 text-base font-medium border-2 focus:outline-none transition-all duration-200 ${
                  validateEmail(formData.email)
                    ? "border-green-500 focus:border-green-600 text-green-600 bg-green-50/30"
                    : "border-gray-300 focus:border-red-500 text-gray-700 bg-white"
                }`}
                type="email"
                autoComplete="off"
              />
              {!validateEmail(formData.email) && formData.email.length > 0 ? (
                <p className="text-sm text-red-500 ml-1 font-medium">
                  Введите корректный email адрес
                </p>
              ) : !validateEmail(formData.email) ? (
                <p className="text-sm text-gray-500 ml-1">
                  Введите корректный email адрес
                </p>
              ) : (
                <p className="text-sm text-green-600 flex items-center gap-2 font-semibold ml-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Email корректен!
                </p>
              )}
            </div>
          </div>
        </Step>

        {/* Шаг 3: Пароль */}
        <Step>
          <div className="space-y-6 px-[30px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Создайте пароль
              </h2>
              <p className="text-gray-500 text-lg">
                Выберите надежный пароль для защиты аккаунта
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label
                className="font-semibold text-gray-800 text-base"
                htmlFor="password"
              >
                Пароль
              </label>
              <input
                placeholder="Создайте надежный пароль"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full h-14 rounded-xl px-5 text-base font-medium border-2 focus:outline-none transition-all duration-200 ${
                  passwordStrength.isStrong
                    ? "border-green-500 focus:border-green-600 text-green-600 bg-green-50/30"
                    : "border-gray-300 focus:border-red-500 text-gray-700 bg-white"
                }`}
                type="password"
                autoComplete="off"
              />

              {/* Индикатор силы пароля */}
              {formData.password.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-sm font-semibold text-gray-700">
                      Надежность пароля:
                    </p>
                    <span
                      className={`text-sm font-bold ${
                        passwordStrength.score <= 2
                          ? "text-red-500"
                          : passwordStrength.score === 3
                            ? "text-yellow-500"
                            : passwordStrength.score === 4
                              ? "text-blue-500"
                              : "text-green-500"
                      }`}
                    >
                      {passwordStrength.score <= 2
                        ? "Слабый"
                        : passwordStrength.score === 3
                          ? "Средний"
                          : passwordStrength.score === 4
                            ? "Хороший"
                            : "Отличный"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
                          passwordStrength.score >= level
                            ? level <= 2
                              ? "bg-red-400"
                              : level === 3
                                ? "bg-yellow-400"
                                : level === 4
                                  ? "bg-blue-400"
                                  : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Требования к паролю */}
              <div className="mt-5 space-y-3 bg-gradient-to-br from-gray-50 to-gray-100/50 p-5 rounded-2xl border border-gray-200">
                <p className="text-sm font-bold text-gray-800 mb-3">
                  Требования к паролю:
                </p>

                {[
                  { key: "length", label: "Минимум 8 символов" },
                  { key: "lowercase", label: "Строчная буква (a-z)" },
                  { key: "uppercase", label: "Заглавная буква (A-Z)" },
                  { key: "numbers", label: "Цифра (0-9)" },
                  { key: "special", label: "Спецсимвол (!@#$%^&*)" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                        passwordStrength.checks[key]
                          ? "bg-green-500 scale-110"
                          : "bg-gray-300"
                      }`}
                    >
                      {passwordStrength.checks[key] && (
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm transition-all duration-200 ${
                        passwordStrength.checks[key]
                          ? "text-green-700 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {passwordStrength.isStrong && (
                <div className="mt-4 text-sm text-green-600 flex items-center gap-2.5 font-semibold bg-green-50 p-4 rounded-xl border border-green-200">
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Отличный пароль! Все требования выполнены
                </div>
              )}
            </div>
          </div>
        </Step>

        {/* Шаг 4: Выбор опции */}
        <Step>
          <div className="space-y-6 px-[30px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Последний шаг
              </h2>
              <p className="text-gray-500 text-lg">Выберите вашу группу</p>
            </div>
            <div className="flex flex-col gap-3">
              <label
                className="font-semibold text-gray-800 text-base"
                htmlFor="groupID"
              >
                Выберите группу
              </label>
              <select
                className={`w-full h-14 px-5 rounded-xl border-2 text-base font-medium focus:outline-none transition-all duration-200 cursor-pointer ${
                  formData.groupID !== ""
                    ? "border-green-500 text-green-600 bg-green-50/30"
                    : "border-gray-300 focus:border-red-500 text-gray-700 bg-white"
                }`}
                value={formData.groupID}
                onChange={(e) => {
                  handleInputChange("groupID", e.target.value);
                }}
                id="option"
              >
                <option value="">Выберите...</option>

                {groups?.groups.map((m) => (
                  <option value={`${m._id}`}>{m.groupName}</option>
                ))}
              </select>
              {formData.groupID === "" ? (
                <p className="text-sm text-gray-500 ml-1">Выберите опцию</p>
              ) : (
                <p className="text-sm text-green-600 flex items-center gap-2 font-semibold ml-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Выбрано!
                </p>
              )}
            </div>
          </div>
        </Step>

        {/* Шаг 5: Подтверждение */}
        <Step>
          <div className="space-y-8 px-[30px]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-5 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Регистрация завершена!
              </h2>
              <p className="text-gray-500 text-lg">
                Проверьте введенные данные
              </p>
            </div>

            <div className="space-y-4 bg-gradient-to-br from-gray-50 to-gray-100/50 p-7 rounded-2xl border border-gray-200">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    Имя пользователя
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formData.username}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    Email
                  </p>
                  <p className="text-lg font-bold text-gray-900 break-all">
                    {formData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    Пароль
                  </p>
                  <p className="text-lg font-bold text-gray-900">••••••••</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    Выбранная опция
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {getOptionLabel(formData.groupID)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleFinalSubmit}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
            >
              Подтвердить регистрацию
            </button>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default SingUp;
