import SearchResultCard from "./SearchResultCard";

const SearchResults = ({ loading, journals }) => {

    if (loading) {

        return (

            <div className="mt-8 bg-white rounded-xl shadow p-10 text-center">

                <p className="text-slate-500">
                    Searching journals...
                </p>

            </div>

        );

    }

    if (!journals.length) {

        return (

            <div className="mt-8 bg-white rounded-xl shadow p-10 text-center">

                <h2 className="text-xl font-semibold text-slate-700">
                    No Journals Found
                </h2>

                <p className="text-slate-500 mt-2">
                    Try changing the search keyword or filters.
                </p>

            </div>

        );

    }

    return (

        <div className="mt-8 space-y-5">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                    Search Results
                </h2>

                <span className="text-slate-500">
                    {journals.length} Result{journals.length !== 1 ? "s" : ""}
                </span>

            </div>

            {
                journals.map((journal) => (

                    <SearchResultCard
                        key={journal.id}
                        journal={journal}
                    />

                ))
            }

        </div>

    );

};

export default SearchResults;