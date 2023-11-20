import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchResults.module.css";
import RestaurantCard from "./RestaurantCard";
import MenuItem from "./MenuItem";
import { addRelatedInfo } from "../Store/Slices/searchSlice";
import { fetchSearchResults } from "../Store/apiCalls";
import Skeleton from "./Skeleton";
const SearchResults = function () {
  const dispatch = useDispatch();
  const info = useSelector((store) => store.search.relatedInfo);
  const { type } = info;
  const data = useSelector((store) => store.search.data);
  const loading = useSelector((store) => store.search.loading);
  if (loading) {
    return <Skeleton type="Search" />;
  }
  const handleClick = function (clickedType) {
    if (type == clickedType) {
      return;
    } else {
      const relatedinfo = { ...info, type: clickedType };
      dispatch(addRelatedInfo(relatedinfo));
      fetchSearchResults(dispatch, relatedinfo);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button
          className={type == "RESTAURANT" ? styles.active : ""}
          onClick={() => handleClick("RESTAURANT")}
        >
          Restaurants
        </button>
        <button
          className={type == "DISH" ? styles.active : ""}
          onClick={() => handleClick("DISH")}
        >
          Dishes
        </button>
      </div>
      <hr style={{ height: ".5px", backgroundColor: "#ddd", border: "none" }} />
      {type == "RESTAURANT" && (
        <div className={styles.content}>
          {data?.map((item, index) => (
            <div key={index} className={styles.card}>
              <RestaurantCard details={item.card.card.info} horizontal={true} />
            </div>
          ))}
        </div>
      )}
      {type == "DISH" && (
        <div className={styles.content}>
          {data?.map((item, index) => (
            <div key={index} className={styles.card}>
              <MenuItem item={item.card} search={true} extended={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
