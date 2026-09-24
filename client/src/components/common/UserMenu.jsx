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
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition hover:bg-slate-50"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to- from-emerald-500 to-teal-600 text-sm font-semibold text-white">
                        {initials}
                    </div>

                    <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${open ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {open && (
                    <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                        {/* User Info */}
                        <div className="border-b border-slate-100 px-5 py-4">
                            <div className="text-lg font-semibold text-slate-900">
                                {user?.name}
                            </div>

                            <div className="text-sm text-slate-500">
                                {user?.email}
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            <button
                                onClick={() => {
                                    navigate(ROUTES.PROFILE);
                                    setOpen(false);
                                }}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100"
                            >
                                <User size={18} />
                                Profile
                            </button>

                            <button
                                onClick={() => {
                                    navigate(ROUTES.SETTINGS);
                                    setOpen(false);
                                }}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100"
                            >
                                <Settings size={18} />
                                Settings
                            </button>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setIsGuideOpen(true);
                                }}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100"
                            >
                                <BookOpen size={18} />
                                Quick Guide
                            </button>

                            <div className="my-2 border-t border-slate-200" />

                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
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