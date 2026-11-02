import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { ROUTES } from "../../constants/routes";

const SearchResultCard = ({ journal }) => {

    const navigate = useNavigate();

    const handleOpenJournal = () => {

        navigate(ROUTES.JOURNAL, {
            state: {
                journal,
            },
        });

    };

    const getStatusColor = () => {

        switch (journal.status) {

            case "completed":
                return "neu-accent";

            case "draft":
                return "neu-warn";

            default:
                return "neu-muted";

        }

    };

    return (

        <div
            onClick={handleOpenJournal}
            className="
                neu-card
                p-5
                sm:p-6
                cursor-pointer
                transition-all
                duration-200
            "
        >

            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">

                <h3 className="font-display text-lg sm:text-xl font-medium neu-text">

                    {dayjs(journal.date).format("DD MMMM YYYY")}

                </h3>

                <span
                    className={`neu-chip inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold shrink-0 ${getStatusColor()}`}
                >
                    <span
                        className="w-2 h-2 rounded-full bg-current"
                        aria-hidden="true"
                    />
                    {journal.status}
                </span>

            </div>

            <div className="space-y-3">

                <div>

                    <p className="text-sm neu-muted">

                        Project

                    </p>

                    <p className="font-medium neu-text">

                        {journal.projects?.length
                            ? journal.projects[0]
                            : "No Project"}

                    </p>

                </div>

                <div>

                    <p className="text-sm neu-muted">

                        Notes

                    </p>

                    <p className="neu-text line-clamp-2">

                        {
                            journal.notes?.trim()
                                ? journal.notes
                                : "No notes available."
                        }

                    </p>

                </div>

            </div>

            <div className="flex justify-end mt-5">

                <button
                    className="
                        neu-btn
                        neu-btn-accent
                        h-11
                        px-5
                        rounded-xl
                    "
                >
                    Open Journal →
                </button>

            </div>

        </div>

    );

};

export default SearchResultCard;