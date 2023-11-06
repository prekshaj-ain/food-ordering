import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchPage.module.css";
import { fetchSuggestions } from "../Store/apiCalls";
import Suggestions from "../Components/Suggestions";
import { useRef } from "react";

const SearchPage = function () {
  const dispatch = useDispatch();
  const suggestionsCache = useSelector((store) => store.suggestions.cache);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [query, setQuery] = useState(searchQuery.get("query") || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef();
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
    if (query.trim() !== "") {
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
      {showSuggestions ? <Suggestions query={query} /> : <div></div>}
    </div>
  );
};

export default SearchPage;
