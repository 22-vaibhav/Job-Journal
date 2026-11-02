import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import SearchBar from "../../components/search/SearchBar";
import FilterBar from "../../components/search/FilterBar";
import SearchResults from "../../components/search/SearchResults";

import { searchJournals } from "../../services/journalService";

const SearchPage = () => {

  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    status: "all",
    month: "",
    year: "",
  });

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {

      loadJournals();

    }, 300);

    return () => clearTimeout(timer);

  }, [keyword, filters]);

  const loadJournals = async () => {

    try {

      setLoading(true);

      const response = await searchJournals({

        keyword,

        status: filters.status,

        month: filters.month,

        year: filters.year,

      });

      setResults(response.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to fetch journals."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="w-full max-w-6xl mx-auto">

      <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight neu-text mb-6 sm:mb-8">
        Search Journals
      </h1>

      <div className="neu-card p-4 sm:p-6 space-y-4 sm:space-y-6">

        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
        />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          setKeyword={setKeyword}
        />

      </div>

      <SearchResults
        loading={loading}
        journals={results}
      />

    </div>

  );

};

export default SearchPage;