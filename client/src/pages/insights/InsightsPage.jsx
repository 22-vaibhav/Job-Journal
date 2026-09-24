import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getJournalStatistics } from "../../services/journalService";

import StatsGrid from "../../components/insights/StatsGrid";
import CompletionCard from "../../components/insights/CompletionCard";

const InsightsPage = () => {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchStatistics();

    }, []);

    const fetchStatistics = async () => {

        try {

            setLoading(true);

            const response = await getJournalStatistics();

            setStats(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load insights.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="max-w-7xl mx-auto py-8">

                <style>
                    {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
                </style>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Analytics
                </p>

                <h1
                    className="mt-1 text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Insights
                </h1>

                <div className="mt-10 flex flex-col items-center gap-3 text-slate-500">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-emerald-700 animate-spin" />
                    <span className="text-sm font-medium">
                        Loading statistics...
                    </span>
                </div>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto py-8 space-y-8">

            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
            </style>

            <div>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Analytics
                </p>

                <h1
                    className="mt-1 text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Insights
                </h1>

                <p className="text-slate-500 mt-2">
                    Track your productivity and career growth over time.
                </p>

            </div>

            <StatsGrid stats={stats} />

            <CompletionCard stats={stats} />

        </div>

    );

};

export default InsightsPage;