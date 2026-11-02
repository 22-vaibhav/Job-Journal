import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProfile } from "../../services/userService";

import ProfileHeader from "../../components/profile/ProfileHeader";
import UserInfoCard from "../../components/profile/UserInfoCard";

import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setUser: setAuthUser } = useAuth();

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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 neu-muted">
          <div className="w-8 h-8 rounded-full neu-inset-sm border-2 border-transparent border-t-current neu-accent animate-spin" />
          <span className="text-sm font-medium">
            Loading profile…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="relative max-w-5xl mx-auto space-y-6 sm:space-y-8">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] neu-accent">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" strokeLinecap="round" />
            </svg>
            Account
          </p>

          <h1
            className="font-display mt-1 text-3xl sm:text-4xl font-medium tracking-tight neu-text"
          >
            My Profile
          </h1>
        </div>

        <ProfileHeader
          user={user}
          onProfileImageUpdate={(updatedUser) => {
            setUser(updatedUser);
            setAuthUser(updatedUser);
          }}
        />

        <UserInfoCard user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;