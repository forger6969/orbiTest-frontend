import React, { useState, useMemo, useEffect } from "react";
import Stepper, { Step } from "../Components/Stepper";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { showToast } from "../helper/ShowToast";
import logo from "../assets/logo.svg";
import {
  ChevronLeft,
  ArrowRight,
  User,
  Mail,
  Lock,
  Layers,
  CheckCircle,
} from "lucide-react";

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
  console.log(groups);
  const navigate = useNavigate();

  const getGroups = async () => {
    try {
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/group/all"
      );
      const data = await req.data;
      setGroups(data);
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

  const handleFinalSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        import.meta.env.VITE_BACKEND_API + "/api/auth/register",
        formData
      );
      showToast("Registration successful", "success");
      navigate("/Register");
    } catch (err) {
      showToast("Registration failed, please try again", "error");
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
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden pb-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-qizil1 via-qizil2 to-qizil1 opacity-50" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-qizil1/5 rounded-full blur-3xl" />

      {/* Back Button */}
      <div className="p-6 relative z-10">
        <Link
          to="/Register"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-qizil1 transition-all font-bold text-sm group"
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-qizil1/30 transition-all">
            <ChevronLeft size={18} />
          </div>
          <span>Back to Login</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-[500px]">
          <div className="text-center mb-10">
            <img className="h-12 mx-auto mb-6" src={logo} alt="orbiTest" />
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Join orbiTest student community
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-xl shadow-slate-900/5 mb-8">
            <div className="space-y-6">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full py-3.5 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-3 transition-all font-bold text-slate-700 hover:border-slate-300 group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                >
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
                <span>Sign up with Google</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-100 flex-grow"></div>
                <span className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">
                  or manual registration
                </span>
                <div className="border-t border-slate-100 flex-grow"></div>
              </div>

              <Stepper
                initialStep={1}
                canProceed={canProceed}
                isLoading={isLoading}
                onStepChange={setCurrentStep}
                onFinalStepCompleted={handleFinalSubmit}
                backButtonText="Back"
                nextButtonText="Continue"
              >
                <Step title="Name">
                  <div className="space-y-5 py-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        First Name
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-qizil1 transition-colors">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="John"
                          className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-qizil1/50 focus:bg-white transition-all text-sm font-medium"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Last Name
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-qizil1 transition-colors">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Doe"
                          className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-qizil1/50 focus:bg-white transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </Step>

                <Step title="Account">
                  <div className="space-y-5 py-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        placeholder="johndoe123"
                        className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-qizil1/50 focus:bg-white transition-all text-sm font-medium"
                        autoFocus
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Email
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-qizil1 transition-colors">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="john@example.com"
                          className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-qizil1/50 focus:bg-white transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </Step>

                <Step title="Security">
                  <div className="space-y-5 py-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-qizil1 transition-colors">
                          <Lock size={18} />
                        </div>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          placeholder="••••••••"
                          className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-qizil1/50 focus:bg-white transition-all text-sm font-medium"
                          autoFocus
                        />
                      </div>
                    </div>

                    {formData.password && (
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                i < passwordStrength.score
                                  ? passwordStrength.score <= 2
                                    ? "bg-red-400"
                                    : passwordStrength.score === 3
                                      ? "bg-amber-400"
                                      : "bg-emerald-400"
                                  : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <CheckItem
                            label="8+ chars"
                            met={passwordStrength.checks.length}
                          />
                          <CheckItem
                            label="Lowercase"
                            met={passwordStrength.checks.lowercase}
                          />
                          <CheckItem
                            label="Uppercase"
                            met={passwordStrength.checks.uppercase}
                          />
                          <CheckItem
                            label="Number"
                            met={passwordStrength.checks.numbers}
                          />
                          <CheckItem
                            label="Special"
                            met={passwordStrength.checks.special}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Step>

                <Step title="Finish">
                  <div className="space-y-5 py-2 text-center">
                    <div className="w-20 h-20 bg-qizil1/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Layers className="w-10 h-10 text-qizil1" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Select Your Group
                      </label>
                      <select
                        value={formData.groupID}
                        onChange={(e) =>
                          handleInputChange("groupID", e.target.value)
                        }
                        className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-qizil1/50 focus:bg-white transition-all text-sm font-bold text-slate-700 appearance-none text-center"
                      >
                        <option value="">Choose a group...</option>
                        {groups?.groups.map((group) => (
                          <option key={group._id} value={group._id}>
                            {group.groupName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium px-6 leading-relaxed">
                      By clicking "Finish", you agree to our Terms of Service
                      and Privacy Policy.
                    </p>
                  </div>
                </Step>
              </Stepper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckItem = ({ label, met }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${met ? "bg-emerald-500" : "bg-slate-200"}`}
    >
      {met && <CheckCircle size={10} className="text-white" />}
    </div>
    <span
      className={`text-[10px] font-bold uppercase tracking-wider ${met ? "text-slate-700" : "text-slate-400"}`}
    >
      {label}
    </span>
  </div>
);

export default SingUp;
