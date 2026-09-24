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
                return "bg-green-100 text-green-700";

            case "draft":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    return (

        <div
            onClick={handleOpenJournal}
            className="
                bg-white
                rounded-xl
                shadow
                p-6
                cursor-pointer
                hover:shadow-lg
                transition-all
                duration-200
            "
        >

            <div className="flex justify-between items-center mb-4">

                <h3 className="text-lg font-semibold">

                    {dayjs(journal.date).format("DD MMMM YYYY")}

                </h3>

                <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${getStatusColor()}
                    `}
                >
                    {journal.status}
                </span>

            </div>

            <div className="space-y-3">

                <div>

                    <p className="text-sm text-slate-500">

                        Project

                    </p>

                    <p className="font-medium">

                        {journal.projects?.length
                            ? journal.projects[0]
                            : "No Project"}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Notes

                    </p>

                    <p className="text-slate-700 line-clamp-2">

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
                        text-blue-600
                        font-medium
                        hover:text-blue-800
                    "
                >
                    Open Journal →
                </button>

            </div>

        </div>

    );

};

export default SearchResultCard;