import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";

import WelcomeBanner from "../../components/journey/WelcomeBanner";
import TodayJournalCard from "../../components/journal/TodayJournalCard";

import Calendar from "../../components/calendar/Calendar";

const JourneyPage = () => {
    return (
        <PageContainer>
            <div className="space-y-6">
                <WelcomeBanner />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar Section */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <Calendar />
                        </Card>
                    </div>

                    {/* Today's Journal */}
                    <TodayJournalCard />
                </div>
            </div>
        </PageContainer>
    );
};

export default JourneyPage;