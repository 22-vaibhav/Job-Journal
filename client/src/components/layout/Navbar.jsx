import { Link, NavLink } from "react-router-dom";
import { Compass, Search, BarChart3 } from "lucide-react";

import { ROUTES } from "../../constants/routes";

import UserMenu from "../common/UserMenu";

const navLinkBaseClasses =
    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

const navLinkClasses = ({ isActive }) =>
    isActive
        ? `${navLinkBaseClasses} bg-emerald-50 text-emerald-700`
        : `${navLinkBaseClasses} text-slate-600 hover:bg-slate-50 hover:text-slate-900`;

const Navbar = () => {
    return (
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_2px_rgba(16,24,40,0.04)] backdrop-blur">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
            </style>

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
                {/* Logo */}
                <Link
                    to={ROUTES.JOURNEY}
                    className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white"
                >
                    <span className="flex h-12 w-12 items-center justify-center overflow-hidden">
                        <img
                            src="../../../public/journal.png"
                            alt="JobJournal logo"
                            className="h-full w-full object-contain p-1.5"
                        />
                    </span>

                    <span
                        className="pr-3 text-xl font-semibold tracking-tight text-slate-900"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        JobJournal
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden items-center gap-1 sm:flex">
                    <NavLink
                        to={ROUTES.JOURNEY}
                        className={navLinkClasses}
                    >
                        <Compass size={16} />
                        My Journey
                    </NavLink>

                    <NavLink
                        to={ROUTES.INSIGHTS}
                        className={navLinkClasses}
                    >
                        <BarChart3 size={16} />
                        Insights
                    </NavLink>

                    <NavLink
                        to={ROUTES.SEARCH}
                        className={navLinkClasses}
                    >
                        <Search size={16} />
                        Search
                    </NavLink>
                </nav>

                {/* User Menu */}
                <div className="flex items-center">
                    <UserMenu />
                </div>
            </div>
        </header>
    );
};

export default Navbar;