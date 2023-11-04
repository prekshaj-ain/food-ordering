import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import TagButton from "./TagButton";
import { addFilter, removeFilter } from "../Store/Slices/restaurantsSlice";
import styles from "./FilterHeader.module.css";

const FilterHeader = function ({ setShow }) {
  const dispatch = useDispatch();
  const headerRef = useRef();
  const menuRef = useRef();
  const activefilters = useSelector((store) => store.restaurants.filters);
  const filters = useSelector((store) => store.app.filters);
  const [selectedSort, setSelectedSort] = useState(activefilters["Sort"][0]);
  const [expand, setExpand] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > headerRef.current.offsetTop) {
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
    const handler = function (e) {
      if (!menuRef.current.contains(e.target)) {
        setExpand(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  useEffect(() => {
    setSelectedSort(activefilters["Sort"][0]);
  }, [activefilters]);
  const handleOpen = function () {
    setShow(true);
  };
  const handleRemove = function (filter, val) {
    dispatch(removeFilter({ filter, val }));
  };
  const handleCheck = function (e, val) {
    setSelectedSort(val);
  };
  const handleApply = function () {
    dispatch(addFilter({ ...activefilters, Sort: [selectedSort] }));
    setExpand(false);
  };
  return (
    <div
      className={`${styles.header} ${isSticky ? styles.sticky : ""}`}
      ref={headerRef}
    >
      <TagButton onClick={handleOpen}>
        <p>Filter</p>
        <span>
          <TuneIcon className={styles.icon} />
        </span>
      </TagButton>
      <div className={styles.sort} ref={menuRef}>
        <TagButton onClick={() => setExpand((prev) => !prev)}>
          <p>
            {activefilters["Sort"].includes("Relevance")
              ? "Sort By"
              : selectedSort}
          </p>
          <span>
            <ExpandMoreIcon className={expand ? styles.icon : styles.show} />
          </span>
        </TagButton>
        {expand && (
          <div className={styles.expand}>
            <p>Sort By</p>
            {filters["Sort"].subFilter.map((val, index) => (
              <div key={index} className={styles.field}>
                <input
                  type="radio"
                  id={`Sort-${index}`}
                  name="Sort"
                  value={val.title}
                  className={styles.radioButton}
                  checked={selectedSort === val.title}
                  onChange={(e) => {
                    handleCheck(e, val["title"]);
                  }}
                />
                <label htmlFor={`Sort-${index}`}>
                  <p>{val.title}</p>
                </label>
              </div>
            ))}
            <hr />
            <button onClick={handleApply}>
              <h6 className={styles.action}>Apply</h6>
            </button>
          </div>
        )}
      </div>
      {Object.keys(activefilters).map((filter, index) => {
        if (filter == "Sort") return;
        return activefilters[filter].map((val, index) => (
          <TagButton key={index} active>
            <p>{val}</p>
            <span onClick={() => handleRemove(filter, val)}>
              <CloseIcon className={styles.icon} />
            </span>
          </TagButton>
        ));
      })}
    </div>
  );
};

export default FilterHeader;
