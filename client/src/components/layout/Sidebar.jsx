import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    Compass,
    Search,
    BarChart3,
    Files,
    FileText,
    Menu,
    X,
} from "lucide-react";

import { ROUTES } from "../../constants/routes";

import UserMenu from "../common/UserMenu";

const linkBase =
    "neu-link flex h-12 items-center gap-3 px-4 text-[15px]";

const navLinkClasses = ({ isActive }) =>
    isActive ? `${linkBase} neu-active` : linkBase;

// Add future sections (e.g. Resume Builder) to this list.
const NAV_LINKS = [
    { to: ROUTES.JOURNEY, icon: Compass, label: "My Journey" },
    { to: ROUTES.INSIGHTS, icon: BarChart3, label: "Insights" },
    { to: ROUTES.SEARCH, icon: Search, label: "Search" },
    { to: ROUTES.DOCUMENTS, icon: Files, label: "Documents" },
];

const Sidebar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            {/* Mobile top bar */}
            <div className="neu-ground sticky top-0 z-30 flex items-center justify-between px-4 py-3 lg:hidden"
                style={{ boxShadow: "0 8px 16px var(--neu-lo)" }}
            >
                <Link to={ROUTES.JOURNEY} className="flex items-center gap-2">
                    <span className="neu-raised-sm flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
                        <img
                            src="/journal.png"
                            alt="JobJournal logo"
                            className="h-full w-full object-contain p-1.5"
                        />
                    </span>
                    <span className="font-display text-lg font-semibold neu-text">
                        JobJournal
                    </span>
                </Link>

                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="neu-btn flex h-11 w-11 items-center justify-center"
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar (drawer on mobile, fixed column on desktop) */}
            <aside
                className={`${mobileOpen ? "flex" : "hidden"} neu-card z-20 mx-4 mb-2 flex-col gap-3.5 p-5 lg:sticky lg:top-7 lg:mx-0 lg:mb-0 lg:flex lg:w-62 lg:shrink-0 lg:rounded-[2rem]`}
            >
                {/* Logo */}
                <Link
                    to={ROUTES.JOURNEY}
                    onClick={closeMobile}
                    className="hidden items-center gap-3 px-1.5 pb-3.5 lg:flex"
                >
                    <span className="neu-raised-sm flex h-11 w-11 items-center justify-center overflow-hidden rounded-[0.875rem]">
                        <img
                            src="/journal.png"
                            alt="JobJournal logo"
                            className="h-full w-full object-contain p-1.5"
                        />
                    </span>

                    <span className="font-display text-xl font-semibold tracking-tight neu-text">
                        JobJournal
                    </span>
                </Link>

                {/* Main navigation */}
                <nav className="flex flex-col gap-3.5" aria-label="Main">
                    {NAV_LINKS.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={navLinkClasses}
                            onClick={closeMobile}
                        >
                            <Icon size={20} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Career tools: placeholder for upcoming sections */}
                <div className="mt-2.5 px-1.5 text-[11px] font-semibold uppercase tracking-widest neu-muted">
                    Career tools
                </div>
                <div
                    className="flex h-12 items-center gap-3 rounded-2xl border-[1.5px] border-dashed px-4 text-[15px] font-medium neu-muted"
                    style={{ borderColor: "var(--neu-lo)" }}
                >
                    <FileText size={20} />
                    <span className="flex-1">Resume Builder</span>
                    <span className="neu-chip px-2 py-0.5 text-[11px] font-semibold">
                        Soon
                    </span>
                </div>

                {/* Bottom: account menu (Profile, Settings, Quick Guide, Logout) */}
                <div className="mt-6 flex flex-col gap-3.5 lg:mt-10">
                    <UserMenu />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;