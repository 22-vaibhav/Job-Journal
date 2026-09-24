import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProfile } from "../../services/userService";

import ProfileHeader from "../../components/profile/ProfileHeader";
import UserInfoCard from "../../components/profile/UserInfoCard";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-emerald-700 animate-spin" />
          <span className="text-sm font-medium">
            Loading profile…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
      </style>

      {/* Subtle ambient wash behind the header for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-[0.06]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, #0F6B5C 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" strokeLinecap="round" />
            </svg>
            Account
          </p>

          <h1
            className="mt-1 text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            My Profile
          </h1>
        </div>

        <ProfileHeader user={user} />

        <UserInfoCard user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;