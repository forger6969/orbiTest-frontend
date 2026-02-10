// src/pages/CompleteProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../helper/ShowToast";
import logo from "../assets/logo.svg";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    groupID: "",
    username: "",
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      showToast("Please login first", "error");
      navigate("/Register");
      return;
    }

    // Получаем список групп
    fetchGroups();

    // Получаем данные пользователя
    fetchUserData(userId);
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/group/all"
      );
      setGroups(response.data.groups || []);
    } catch (err) {
      console.error("Error fetching groups:", err);
      showToast("Failed to load groups", "error");
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data);
      // Предзаполняем username
      setFormData((prev) => ({
        ...prev,
        username: response.data.username || "",
      }));
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    formData.groupID !== "" && formData.username.trim().length > 0;

  const handleSubmit = async () => {
    if (!isFormValid) {
      showToast("Please fill all fields", "warning");
      return;
    }

    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_API + "/api/auth/complete-profile",
        {
          userId,
          groupID: formData.groupID,
          username: formData.username,
        }
      );

      // Обновляем токен
      localStorage.setItem("token", response.data.token);

      showToast("Profile completed successfully!", "success");
      navigate("/Dashboard");
    } catch (err) {
      console.error("Error completing profile:", err);
      showToast(
        err?.response?.data?.message || "Failed to complete profile",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e7eb5c] flex justify-center items-center">
      <div className="w-[470px] flex flex-col items-center gap-3">
        <img width={260} src={logo} alt="logo" />

        <div className="bg-white w-full border border-gray-400 rounded-lg p-6">
          <h2 className="text-black text-[24px] font-semibold mb-2">
            Complete Your Profile
          </h2>
          <p className="text-sm text-[#737373] mb-6">
            Just a few more details to get started
          </p>

          {/* Информация о пользователе */}
          {userData && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 rounded-xl mb-6 border border-gray-200">
              <div className="flex items-center gap-3">
                {userData.avatar && (
                  <img
                    src={userData.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {userData.firstName} {userData.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
              </div>
            </div>
          )}

          <form className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`
                  h-10 rounded-lg pl-3 border-2 outline-none
                  ${
                    formData.username.trim().length > 0
                      ? "border-green-500"
                      : "border-gray-300"
                  }
                `}
              />
            </div>

            {/* Group Selection */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Select Your Group</label>
              <select
                value={formData.groupID}
                onChange={(e) => handleInputChange("groupID", e.target.value)}
                className={`
                  h-10 rounded-lg pl-3 border-2 outline-none cursor-pointer
                  ${
                    formData.groupID !== ""
                      ? "border-green-500"
                      : "border-gray-300"
                  }
                `}
              >
                <option value="">Choose a group...</option>
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              className={`
                mt-2 py-2 rounded-lg flex items-center justify-center gap-2
                transition-all
                ${
                  isFormValid && !loading
                    ? "bg-[#ef4343] text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Completing..." : "Complete Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
