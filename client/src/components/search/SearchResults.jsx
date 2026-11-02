import SearchResultCard from "./SearchResultCard";

const SearchResults = ({ loading, journals }) => {

    if (loading) {

        return (

            <div className="mt-8 neu-card p-8 sm:p-10 text-center">

                <p className="neu-muted">
                    Searching journals...
                </p>

            </div>

        );

    }

    if (!journals.length) {

        return (

            <div className="mt-8 neu-card p-8 sm:p-10 text-center">

                <h2 className="font-display text-xl font-medium neu-text">
                    No Journals Found
                </h2>

                <p className="neu-muted mt-2">
                    Try changing the search keyword or filters.
                </p>

            </div>

        );

    }

    return (

        <div className="mt-8 space-y-5">

            <div className="flex items-center justify-between">

                <h2 className="font-display text-xl font-medium neu-text">
                    Search Results
                </h2>

                <span className="neu-muted">
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