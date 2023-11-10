import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchPage.module.css";
import { fetchSearchResults, fetchSuggestions } from "../Store/apiCalls";
import Suggestions from "../Components/Suggestions";
import SearchResults from "../Components/SearchResults";
import { addRelatedInfo } from "../Store/Slices/searchSlice";

const SearchPage = function () {
  const dispatch = useDispatch();
  const suggestionsCache = useSelector((store) => store.suggestions.cache);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [query, setQuery] = useState(searchQuery.get("query") || "");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef();
  const resultsLoading = useSelector((store) => store.search.loading);
  useEffect(() => {
    setQuery(searchQuery.get("query"));
  }, [searchQuery]);
  useEffect(() => {
    if (resultsLoading) {
      setShowSuggestions(false);
    }
  }, [resultsLoading]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > searchRef.current.offsetTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (query && query.trim() !== "") {
      const timer = setTimeout(() => {
        if (!suggestionsCache.hasOwnProperty(query)) {
          fetchSuggestions(dispatch, query);
        }
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [query]);
  const handleChange = function (e) {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };
  const handleSearch = function (e) {
    if (e.key === "Enter" && query?.length > 0) {
      setSearchQuery({ ...searchQuery, query: query });
      setShowSuggestions(false);
      const relatedinfo = {
        submitAction: "ENTER",
        str: query,
      };
      dispatch(addRelatedInfo(relatedinfo));
      fetchSearchResults(dispatch, relatedinfo);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={`${styles.searchHeader} ${isSticky ? styles.sticky : ""}`}
        ref={searchRef}
      >
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for restaurants and food"
            value={query}
            onChange={handleChange}
            onKeyUp={handleSearch}
          />
          <SearchIcon fontSize="small" color="disabled" />
        </div>
      </div>
      {showSuggestions ? (
        <Suggestions query={query} setSearchQuery={setSearchQuery} />
      ) : (
        <SearchResults />
      )}
    </div>
  );
};

export default SearchPage;
