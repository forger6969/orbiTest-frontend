import React, { useState, useMemo, useEffect } from "react";
import Stepper, { Step } from "../Components/Stepper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../helper/ShowToast";
import logo from "../assets/logo.svg";

const SingUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
        import.meta.env.VITE_BACKEND_API + "/api/group/all"
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
    [formData.password]
  );

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim().length > 0;
      case 2:
        return formData.lastName.trim().length > 0;
      case 3:
        return formData.username.trim().length > 0;
      case 4:
        return validateEmail(formData.email);
      case 5:
        return passwordStrength.isStrong;
      case 6:
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
        formData
      );
      showToast("Успешная регистрация", "success");

      navigate("/Register");
    } catch (err) {
      console.log(err);
      showToast("Ошибка регистрации попробуйте заново", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_API}/api/auth/google`;
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="min-h-screen bg-[#e5e7eb5c] relative pb-20">
      {/* Кнопка "Back to home" */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2.5 text-gray-700 text-base font-medium cursor-pointer
        fixed top-6 left-6
        group cursor-pointer
        px-6 py-3.5
        rounded-md
        transition-all duration-300
        hover:bg-qizil1
        hover:text-white
        hover:shadow-xl
        hover:scale-105
        active:scale-95
        z-50"
      >
        <svg
          className="w-4 h-auto transition-transform duration-300 group-hover:-translate-x-1 fill-current"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" />
        </svg>
        Back to home
      </button>

      {/* Секция с быстрой регистрацией через Google */}
      <div className="flex justify-center pt-20 pb-8">
        <div className="w-full max-w-[470px] px-4 flex flex-col items-center gap-3">
          <img width={200} src={logo} alt="logo" />
          <p className="text-sm text-gray-600">
            Quick registration with Google
          </p>

          <div className="bg-white w-full border border-gray-400 rounded-lg p-4 shadow-sm">
            <p className="text-black text-xl font-semibold mb-2">
              Sign up with Google
            </p>
            <p className="text-sm text-[#737373] mb-4">
              Fastest way to create your account
            </p>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="
                w-full py-2.5 px-4 rounded-lg
                border-2 border-gray-300
                bg-white hover:bg-gray-50
                flex items-center justify-center gap-3
                transition-all
                font-medium text-gray-700
                hover:border-gray-400
                hover:shadow-md
              "
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Разделитель */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-3 text-sm text-gray-500 bg-white">OR</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Fill out the form below for manual registration
            </p>
          </div>
        </div>
      </div>

      {/* STEPPER - ПОЛНОСТЬЮ ВИДЕН */}
      <div className="w-full max-w-[600px] mx-auto px-4">
        <Stepper
          initialStep={1}
          canProceed={canProceed}
          isLoading={isLoading}
          onStepChange={(step) => {
            setCurrentStep(step);
          }}
          onFinalStepCompleted={handleFinalSubmit}
          backButtonText="Назад"
          nextButtonText="Далее"
        >
          <Step title="First Name">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">
                  Enter your first name
                </span>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qizil1 focus:border-transparent transition-all"
                  autoFocus
                />
              </label>
            </div>
          </Step>

          <Step title="Last Name">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">
                  Enter your last name
                </span>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qizil1 focus:border-transparent transition-all"
                  autoFocus
                />
              </label>
            </div>
          </Step>

          <Step title="Username">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">
                  Choose a username
                </span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  placeholder="johndoe123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qizil1 focus:border-transparent transition-all"
                  autoFocus
                />
              </label>
            </div>
          </Step>

          <Step title="Email">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">
                  Enter your email address
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qizil1 focus:border-transparent transition-all"
                  autoFocus
                />
                {formData.email && !validateEmail(formData.email) && (
                  <p className="text-red-500 text-sm mt-2">
                    Please enter a valid email address
                  </p>
                )}
              </label>
            </div>
          </Step>

          <Step title="Password">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">
                  Create a strong password
                </span>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qizil1 focus:border-transparent transition-all"
                  autoFocus
                />
              </label>

              {formData.password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded ${
                          i < passwordStrength.score
                            ? passwordStrength.score <= 2
                              ? "bg-red-500"
                              : passwordStrength.score === 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-sm space-y-1">
                    <p
                      className={
                        passwordStrength.checks.length
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      ✓ At least 8 characters
                    </p>
                    <p
                      className={
                        passwordStrength.checks.lowercase
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      ✓ Lowercase letter
                    </p>
                    <p
                      className={
                        passwordStrength.checks.uppercase
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      ✓ Uppercase letter
                    </p>
                    <p
                      className={
                        passwordStrength.checks.numbers
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      ✓ Number
                    </p>
                    <p
                      className={
                        passwordStrength.checks.special
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      ✓ Special character
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Step>

          <Step title="Group Selection">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">
                  Select your group
                </span>
                <select
                  value={formData.groupID}
                  onChange={(e) => handleInputChange("groupID", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qizil1 focus:border-transparent transition-all"
                  autoFocus
                >
                  <option value="">Choose a group...</option>
                  {groups?.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};

export default SingUp;
