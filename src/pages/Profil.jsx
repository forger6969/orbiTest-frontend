import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Award, Heart, Settings, Edit2 } from 'lucide-react';
import axios from 'axios';

const Profil = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const req = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/api/user/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(req.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center p-6">
        <div className="w-full max-w-4xl space-y-6">
          <div className="flex items-center gap-6">
            <div className="animate-pulse rounded-full bg-gray-200 h-32 w-32" />
            <div className="flex-1 space-y-4">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-40 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>

          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="bg-white  rounded-2xl p-6 relative border-gray-200 border-2" >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full  bg-red-500 shadow-red-500   flex items-center justify-center ">
              <User className="w-16 h-16 bg text-gray-400" />
            </div>

            <div className="flex-1 text-center md:text-left ">
              <h1 className="text-2xl font-bold text-gray-800">
                {userData?.lastName} {userData?.firstName}
              </h1>
              <p className="text-sm text-gray-500">ID: {userData?._id}</p>
              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-red-500 text-white text-sm font-semibold">
                Grade: {userData?.grade}
              </span>
            </div>


          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-gray-200 border-2 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Tests Completed</p>
            <p className="text-3xl font-bold text-red-500">{userData?.testsHistory.length}</p>
          </div>

          <div className="border-gray-200 border-2 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Experience</p>
            <p className="text-3xl font-bold text-red-500">5+</p>
          </div>

          <div className="border-gray-200 border-2 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-3xl font-bold text-red-500">Active</p>
          </div>
        </div>

        {/* TABS */}
        <div className="border-gray-200 border-2 rounded-2xl overflow-hidden">
          <div className="flex border-gray-200 border-b-2">
            {['about','activity','tests','settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 font-medium transition ${
                  activeTab === tab
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <InfoRow icon={<Mail />} label="Email" value={userData?.email} />
                <InfoRow icon={<Phone />} label="Phone" value="+998 90 123 45 67" />
                <InfoRow icon={<MapPin />} label="Location" value="Tashkent, Uzbekistan" />
                <InfoRow icon={<Briefcase />} label="Portfolio" value="www.portfolio.com" />
              </div>
            )}

            {activeTab !== 'about' && (
              <div className="text-center py-10 text-gray-400">Coming soon</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 border-gray-200 border-2 rounded-xl p-4">
    <div className="text-red-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default Profil;
