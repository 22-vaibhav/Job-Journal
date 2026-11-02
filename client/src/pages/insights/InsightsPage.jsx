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

            <div className="w-full max-w-7xl mx-auto">


                <p className="text-xs font-semibold uppercase tracking-[0.14em] neu-accent">
                    Analytics
                </p>

                <h1
                    className="font-display mt-1 text-3xl sm:text-4xl font-medium tracking-tight neu-text"
                >
                    Insights
                </h1>

                <div className="mt-10 flex flex-col items-center gap-3 neu-muted">
                    <div className="w-8 h-8 rounded-full neu-inset-sm border-2 border-transparent border-t-current neu-accent animate-spin" />
                    <span className="text-sm font-medium">
                        Loading statistics...
                    </span>
                </div>

            </div>

        );

    }

    return (

        <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">


            <div>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] neu-accent">
                    Analytics
                </p>

                <h1
                    className="font-display mt-1 text-3xl sm:text-4xl font-medium tracking-tight neu-text"
                >
                    Insights
                </h1>

                <p className="neu-muted mt-2">
                    Track your productivity and career growth over time.
                </p>

            </div>

            <StatsGrid stats={stats} />

            <CompletionCard stats={stats} />

        </div>

    );

};

export default InsightsPage;