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

  // ✅ ДОБАВЬТЕ ЭТУ ФУНКЦИЮ
  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_API}/api/auth/google`;
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
            <p className="text-black text-[24px] font-semibold">Sign In</p>
            <p className="text-sm text-[#737373]">
              Welcome back! Please sign in to continue
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

              {/* Login Button */}
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

              {/* ✅ ДОБАВЬТЕ РАЗДЕЛИТЕЛЬ */}
              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="px-3 text-sm text-gray-500 bg-white">OR</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              {/* ✅ ДОБАВЬТЕ КНОПКУ GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
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
                Sign in with Google
              </button>
            </form>
          </div>

          <Link to="/SingUp" className="text-red-500 font-medium mt-2">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registed;
