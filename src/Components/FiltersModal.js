import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./FiltersModal.module.css";
import Backdrop from "./Backdrop";
import { addFilter } from "../Store/Slices/restaurantsSlice";

const FiltersModal = function ({ setShow }) {
  const filters = useSelector((store) => store.app.filters);
  const activeFilters = useSelector((store) => store.restaurants.filters);
  const dispatch = useDispatch();
  const [activeList, setActiveList] = useState("Sort");
  const [selectedFilter, setSelectedFilter] = useState(activeFilters);
  const handleClick = function (type) {
    setActiveList(type);
  };
  const handleCheck = function (e, value) {
    if (e.target.checked) {
      if (e.target.type === "checkbox" && selectedFilter[activeList]) {
        let newVal = [...selectedFilter[activeList], value];
        setSelectedFilter((prev) => {
          return { ...prev, [activeList]: newVal };
        });
      } else {
        setSelectedFilter((prev) => {
          return { ...prev, [activeList]: [value] };
        });
      }
    }
  };
  const handleCancel = function () {};
  const handleConfirm = function () {
    console.log(selectedFilter);
    dispatch(addFilter(selectedFilter));
    setShow(false);
  };

  const content = (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h4>Filter</h4>
        <div onClick={() => setShow(false)}>
          <CloseIcon fontSize="10px" />
        </div>
      </div>
      <div className={styles.container}>
        <ul className={styles.filters}>
          {Object.keys(filters).map((filter) => (
            <li
              key={filter}
              onClick={() => handleClick(filter)}
              className={activeList === filter ? styles.active : ""}
            >
              {filter}
            </li>
          ))}
        </ul>
        <div className={styles.content}>
          {filters[activeList].subFilter.map((filter, index) => (
            <div key={index} className={styles.field}>
              <input
                type={filters[activeList].type}
                id={`${activeList}-${index}`}
                name={activeList}
                value={filter.title}
                className={styles.radioButton}
                checked={
                  selectedFilter.hasOwnProperty(activeList) &&
                  selectedFilter[activeList].includes(filter.title)
                }
                onChange={(e) => handleCheck(e, filter.title)}
              />
              <label htmlFor={`${activeList}-${index}`}>{filter.title}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={handleCancel} className={styles.cancel}>
          Clear Filters
        </button>
        <button onClick={handleConfirm} className={styles.confirm}>
          Apply
        </button>
      </div>
    </div>
  );
  return (
    <>
      <Backdrop onClick={() => setShow(false)} />
      {ReactDOM.createPortal(content, document.getElementById("modal-hook"))}
    </>
  );
};
export default FiltersModal;
