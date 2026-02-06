import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import axios from "axios";
import { showToast } from "../helper/ShowToast";

const Registed = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //  Валидация
  const isEmailValid = email.endsWith("@gmail.com");
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid && !loading;

  const loginRequest = async () => {
    if (!isEmailValid) {
      showToast("Email должен заканчиваться на @gmail.com", "warning");
      return;
    }

    if (!isPasswordValid) {
      showToast("Пароль должен быть минимум 6 символов", "warning");
      return;
    }

    try {
      setLoading(true);

      const req = await axios.post(
        import.meta.env.VITE_BACKEND_API + "/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", req.data.token);
      localStorage.setItem("userId", req.data.user._id);
      showToast("Success login", "success");
      navigate("/Dashboard");
    } catch (err) {
      showToast(err?.response?.data?.message || "Login error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full relative cursor-pointer">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-gray-700 text-base font-medium
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
            className="w-3.5 h-auto pt-1 transition-transform duration-300 group-hover:-translate-x-1.5 fill-current"
            width="800px"
            height="800px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" />
          </svg>
          Back to home
        </Link>
      </div>

      <div className="min-h-screen bg-[#e5e7eb5c] flex justify-center items-center">
        <div className="w-[470px] flex flex-col items-center gap-3">
          <img width={260} src={logo} alt="logo" />
          <p className="text-sm">Enter your email to get started</p>

          <div className="bg-white w-full border border-gray-400 rounded-lg p-4">
            <p className="text-black text-[24px] font-semibold">
              Sign In or Register
            </p>
            <p className="text-sm text-[#737373]">
              We'll guide you through the process
            </p>

            <form className="flex flex-col gap-4 mt-4">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                  h-10 rounded-lg pl-3 border-2 outline-none
                  ${
                    email && !isEmailValid
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
                  }
                `}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                  h-10 rounded-lg pl-3 border-2 outline-none
                  ${
                    password && !isPasswordValid
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
                  }
                `}
                />
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={loginRequest}
                disabled={!isFormValid}
                className={`
                mt-2 py-2 rounded-lg flex items-center justify-center gap-2
                transition-all
                ${
                  isFormValid
                    ? "bg-[#ef4343] text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Loading..." : "Continue"}
              </button>
            </form>
          </div>

          <Link to="/SingUp" className="text-red-500 font-medium mt-2">
            You don't have an account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registed;
