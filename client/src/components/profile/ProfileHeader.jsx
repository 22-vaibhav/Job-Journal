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
        <div className="relative neu-card p-6 sm:p-9">

            <div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                    {/* Avatar */}
                    {/* Avatar */}
                    <div className="shrink-0 mx-auto sm:mx-0">
                        <div className="relative">

                            {/* Avatar */}
                            <div
                                className="rounded-full p-2 neu-raised"
                            >
                                <div
                                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center neu-inset neu-accent relative overflow-hidden"
                                >
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <span
                                                className="font-display relative text-3xl sm:text-4xl font-semibold tracking-wide"
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
                                className="neu-btn neu-btn-accent absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full"
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

                    {/* Identity block */}
                    <div className="flex-1 min-w-0 text-center sm:text-left pt-3 sm:pt-0">
                        <h2
                            className="font-display text-3xl sm:text-4xl font-medium neu-text tracking-tight"
                        >
                            {user.name}
                        </h2>

                        <p className="mt-1 text-base font-medium neu-muted">
                            {user.currentRole || "Professional"}
                        </p>
                    </div>

                </div>

                {/* Meta row */}
                <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <div className="neu-chip inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium neu-accent">
                        <svg
                            className="w-3.5 h-3.5 neu-accent"
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
                        <div className="neu-chip inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium neu-muted">
                            <svg
                                className="w-3.5 h-3.5 neu-muted"
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