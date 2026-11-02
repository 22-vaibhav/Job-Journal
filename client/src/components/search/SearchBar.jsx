import { Search } from "lucide-react";

const SearchBar = ({ keyword, setKeyword }) => {

    return (

        <div className="relative">

            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 neu-muted pointer-events-none"
            />

            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search projects, tasks, meetings, notes..."
                className="neu-input w-full h-12 pl-12 pr-4 py-3 rounded-xl"
            />

        </div>

    );

};

export default SearchBar;