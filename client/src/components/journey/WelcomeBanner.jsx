import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import { Sun, Sunrise, Sunset } from "lucide-react";

const WelcomeBanner = () => {
    const { user } = useAuth();

    const hour = dayjs().hour();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    const GreetingIcon =
        greeting === "Good Morning"
            ? Sunrise
            : greeting === "Good Afternoon"
                ? Sun
                : Sunset;

    return (
        <section className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white px-6 py-7 sm:px-9 sm:py-9 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10)]">

            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
            </style>

            <div
                className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-[0.10]"
                style={{
                    background:
                        "radial-gradient(circle, #0F6B5C 0%, transparent 70%)",
                }}
            />

            <div className="relative space-y-2.5">

                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    <GreetingIcon size={14} strokeWidth={2.25} />
                    {dayjs().format("dddd, MMMM D, YYYY")}
                </div>

                <h1
                    className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    {greeting}, {user?.name} <span className="align-middle">👋</span>
                </h1>

                <p className="text-slate-500 text-base">
                    Every career has a story. Start writing today's chapter.
                </p>

            </div>

        </section>
    );
};

export default WelcomeBanner;