import { useState } from "react";
import { useSelector } from "react-redux";

import AllRestaurants from "./AllRestaurants";
import Skeleton from "./Skeleton";
import FilterHeader from "./FilterHeader";
import FiltersModal from "./FiltersModal";
import { selectFilteredRestaurants } from "../Store/Selectors/filterData";

const RestaurantListing = function () {
  const restaurants = useSelector(selectFilteredRestaurants);
  const loading = useSelector((store) => store.restaurants.loading);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  if (restaurants.length == 0) {
    return <Skeleton type="Posts" />;
  }
  return (
    <div
      style={{
        padding: ".5rem",
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      <h4>Restaurants with online food delivery in Delhi</h4>
      <FilterHeader setShow={setShowFiltersModal} />
      {showFiltersModal && <FiltersModal setShow={setShowFiltersModal} />}
      <AllRestaurants list={restaurants} />
      {loading && <Skeleton type="Posts" />}
    </div>
  );
};

export default RestaurantListing;
