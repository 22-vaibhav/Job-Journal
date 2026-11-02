import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BookOpen,
    ChevronDown,
    LogOut,
    Settings,
    User,
} from "lucide-react";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import { removeToken } from "../../utils/auth";

import QuickGuideModal from "../guide/QuickGuideModal";

const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const menuRef = useRef(null);

    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    const initials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || "U";

    const handleLogout = () => {
        removeToken();
        setUser(null);
        navigate(ROUTES.LOGIN);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    return (
        <>
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="neu-link flex w-full items-center gap-3 rounded-[1.125rem] px-3.5 py-3 text-left"
                >
                    <div className="neu-raised-sm flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-[13px] font-semibold neu-accent">
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt={user?.name || "Profile"}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            initials
                        )}
                    </div>

                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold neu-text">
                            {user?.name}
                        </span>
                        <span className="block text-xs neu-muted">Account menu</span>
                    </span>

                    <ChevronDown
                        size={18}
                        className={`shrink-0 transition-transform duration-200 ${open ? "" : "rotate-180"
                            }`}
                    />
                </button>

                {open && (
                    <div className="neu-card absolute bottom-full left-0 z-40 mb-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl">
                        {/* User Info */}
                        <div className="px-5 py-4">
                            <div className="font-display text-lg font-semibold neu-text">
                                {user?.name}
                            </div>

                            <div className="text-sm neu-muted">
                                {user?.email}
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="flex flex-col gap-2 p-3 pt-0">
                            <button
                                onClick={() => {
                                    navigate(ROUTES.PROFILE);
                                    setOpen(false);
                                }}
                                className="neu-btn flex w-full items-center gap-3 px-4 py-3 text-left"
                            >
                                <User size={18} />
                                Profile
                            </button>

                            <button
                                onClick={() => {
                                    navigate(ROUTES.SETTINGS);
                                    setOpen(false);
                                }}
                                className="neu-btn flex w-full items-center gap-3 px-4 py-3 text-left"
                            >
                                <Settings size={18} />
                                Settings
                            </button>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setIsGuideOpen(true);
                                }}
                                className="neu-btn flex w-full items-center gap-3 px-4 py-3 text-left"
                            >
                                <BookOpen size={18} />
                                Quick Guide
                            </button>

                            <div className="neu-divider my-1" />

                            <button
                                onClick={handleLogout}
                                className="neu-btn neu-btn-danger flex w-full items-center gap-3 px-4 py-3 text-left"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Shared Quick Guide Modal */}
            <QuickGuideModal
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
            />
        </>
    );
};

export default UserMenu;