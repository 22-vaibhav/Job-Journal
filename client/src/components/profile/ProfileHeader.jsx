import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadProfileImage } from "../../services/userService";
import { Pencil } from "lucide-react";


const ProfileHeader = ({ user, onProfileImageUpdate }) => {

    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const initials = user?.name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    const handleProfileImageChange = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5 MB.");
            return;
        }

        try {
            setUploading(true);

            const updatedUser = await uploadProfileImage(file);

            if (onProfileImageUpdate) {
                onProfileImageUpdate(updatedUser);
            }

            toast.success("Profile picture updated.");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to upload profile picture."
            );
        } finally {
            setUploading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10)]">

            {/* Banner */}
            <div
                className="relative h-24 sm:h-28"
                style={{
                    background:
                        "linear-gradient(120deg, #0F6B5C 0%, #11806E 45%, #1B9C87 100%)",
                }}
            >
                <div
                    className="h-full w-full opacity-[0.16]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 15% 25%, #ffffff 0, transparent 35%), radial-gradient(circle at 85% 20%, #ffffff 0, transparent 30%), radial-gradient(circle at 60% 80%, #ffffff 0, transparent 40%)",
                    }}
                />
                {/* Dot-grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                    }}
                />
            </div>

            <div className="px-6 sm:px-10 pb-8 sm:pb-10">

                <div className="flex flex-col sm:flex-row sm:items-end gap-5">

                    {/* Avatar */}
                    {/* Avatar */}
                    <div className="shrink-0 mx-auto sm:mx-0 -mt-14 sm:-mt-16">
                        <div className="relative">

                            {/* Avatar */}
                            <div
                                className="rounded-full p-1.5 bg-white shadow-[0_8px_20px_-6px_rgba(16,24,40,0.25)]"
                            >
                                <div
                                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-white relative overflow-hidden"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #0F6B5C 0%, #1B9C87 100%)",
                                    }}
                                >
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <div
                                                className="absolute inset-0 opacity-20"
                                                style={{
                                                    backgroundImage:
                                                        "radial-gradient(circle at 30% 20%, #ffffff 0, transparent 45%)",
                                                }}
                                            />

                                            <span
                                                className="relative text-3xl sm:text-4xl font-semibold tracking-wide"
                                                style={{
                                                    fontFamily: "'Fraunces', serif",
                                                }}
                                            >
                                                {initials}
                                            </span>
                                        </>
                                    )}

                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="w-7 h-7 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pencil button */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-md transition-all duration-200 hover:scale-110 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                                aria-label="Change profile picture"
                            >
                                <Pencil size={16} />
                            </button>

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                className="hidden"
                            />

                        </div>
                    </div>

                    {/* Identity block — always sits on the white area, never overlaps the banner */}
                    <div className="flex-1 min-w-0 text-center sm:text-left pt-3 sm:pt-0 sm:pb-1.5">
                        <h2
                            className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            {user.name}
                        </h2>

                        <p className="mt-1 text-base font-medium text-slate-600">
                            {user.currentRole || "Professional"}
                        </p>
                    </div>

                </div>

                {/* Meta row */}
                <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-sm font-medium text-emerald-800">
                        <svg
                            className="w-3.5 h-3.5 text-emerald-700"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{user.currentCompany || "ResumeLog AI Member"}</span>
                    </div>

                    {user.experience ? (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-slate-600">
                            <svg
                                className="w-3.5 h-3.5 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 3v18h18M8 17V10M13 17V6M18 17v-4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{user.experience} yrs experience</span>
                        </div>
                    ) : null}
                </div>

            </div>

        </div>
    );
};

export default ProfileHeader;