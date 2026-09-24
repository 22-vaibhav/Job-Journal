import { Search } from "lucide-react";

const SearchBar = ({ keyword, setKeyword }) => {

    return (

        <div className="relative">

            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search projects, tasks, meetings, notes..."
                className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    border
                    border-slate-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                    transition-all
                "
            />

        </div>

    );

};

export default SearchBar;