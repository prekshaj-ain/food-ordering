import { useSelector } from "react-redux";
import AllRestaurants from "./AllRestaurants";
import Skeleton from "./Skeleton";
const RestaurantListing = function () {
  const restaurants = useSelector((store) => store.restaurants.data);
  const loading = useSelector((store) => store.restaurants.loading);
  if (restaurants.length == 0) {
    return <Skeleton type="Posts" />;
  }
  return (
    <div style={{ paddingInline: ".5rem" }}>
      <h4 style={{ paddingBlock: "1rem" }}>
        Restaurants with online food delivery in Delhi
      </h4>
      <AllRestaurants list={restaurants} />
      {loading && <Skeleton type="Posts" />}
    </div>
  );
};

export default RestaurantListing;
