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
        <section className="neu-card relative overflow-hidden px-6 py-7 sm:px-9 sm:py-9">

            <div
                className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-[0.10]"
                style={{
                    background:
                        "radial-gradient(circle, #0F6B5C 0%, transparent 70%)",
                }}
            />

            <div className="relative space-y-2.5">

                <div className="inline-flex items-center gap-2 neu-chip neu-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
                    <GreetingIcon size={14} strokeWidth={2.25} />
                    {dayjs().format("dddd, MMMM D, YYYY")}
                </div>

                <h1
                    className="font-display text-3xl sm:text-4xl font-medium tracking-tight neu-text break-words"
                >
                    {greeting}, {user?.name} <span className="align-middle">👋</span>
                </h1>

                <p className="neu-muted text-base">
                    Every career has a story. Start writing today's chapter.
                </p>

            </div>

        </section>
    );
};

export default WelcomeBanner;