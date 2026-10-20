import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Compass, Search, BarChart3, Files, Menu, X } from "lucide-react";

import { ROUTES } from "../../constants/routes";

import UserMenu from "../common/UserMenu";

const navLinkBaseClasses =
    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

const navLinkClasses = ({ isActive }) =>
    isActive
        ? `${navLinkBaseClasses} bg-emerald-50 text-emerald-700`
        : `${navLinkBaseClasses} text-slate-600 hover:bg-slate-50 hover:text-slate-900`;

const mobileNavLinkClasses = ({ isActive }) =>
    isActive
        ? "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium bg-emerald-50 text-emerald-700 transition-colors"
        : "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors";

const NAV_LINKS = [
    { to: ROUTES.JOURNEY, icon: Compass, label: "My Journey" },
    { to: ROUTES.INSIGHTS, icon: BarChart3, label: "Insights" },
    { to: ROUTES.SEARCH, icon: Search, label: "Search" },
    { to: ROUTES.DOCUMENTS, icon: Files, label: "Documents" },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_2px_rgba(16,24,40,0.04)] backdrop-blur">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
            </style>

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                {/* Logo */}
                <Link
                    to={ROUTES.JOURNEY}
                    className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white"
                >
                    <span className="flex h-12 w-12 items-center justify-center overflow-hidden">
                        <img
                            src="/journal.png"
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

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map(({ to, icon: Icon, label }) => (
                        <NavLink key={to} to={to} className={navLinkClasses}>
                            <Icon size={16} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right side: User Menu + Hamburger */}
                <div className="flex items-center gap-2">
                    <UserMenu />

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 md:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileOpen && (
                <div className="border-t border-slate-200/80 bg-white px-4 py-3 md:hidden">
                    <nav className="flex flex-col gap-1">
                        {NAV_LINKS.map(({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={mobileNavLinkClasses}
                                onClick={() => setMobileOpen(false)}
                            >
                                <Icon size={18} />
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
