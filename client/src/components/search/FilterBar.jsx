const months = [
    { value: "", label: "All Months" },
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

const FilterBar = ({ filters, setFilters, setKeyword, }) => {

    const currentYear = new Date().getFullYear();

    const years = [];

    for (let year = currentYear; year >= 2020; year--) {
        years.push(year);
    }

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const clearFilters = () => {
        
        setKeyword("");

        setFilters({
            status: "all",
            month: "",
            year: "",
        });
    };

    return (

        <div className="flex flex-wrap items-center gap-4">

            {/* Status */}

            <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 bg-white"
            >

                <option value="all">
                    All Status
                </option>

                <option value="draft">
                    Draft
                </option>

                <option value="completed">
                    Completed
                </option>

            </select>

            {/* Month */}

            <select
                name="month"
                value={filters.month}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 bg-white"
            >

                {
                    months.map((month) => (

                        <option
                            key={month.value}
                            value={month.value}
                        >
                            {month.label}
                        </option>

                    ))
                }

            </select>

            {/* Year */}

            <select
                name="year"
                value={filters.year}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 bg-white"
            >

                <option value="">
                    All Years
                </option>

                {
                    years.map((year) => (

                        <option
                            key={year}
                            value={year}
                        >
                            {year}
                        </option>

                    ))
                }

            </select>

            {/* Clear */}

            <button
                onClick={clearFilters}
                className="
                    ml-auto
                    rounded-xl
                    border
                    px-5
                    py-3
                    hover:bg-slate-100
                    transition
                "
            >
                Clear Filters
            </button>

        </div>

    );

};

export default FilterBar;