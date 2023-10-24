import AllRestaurants from "./AllRestaurants";
const RestaurantListing = function ({ restaurants }) {
  console.log(restaurants);
  return (
    <div style={{ paddingInline: ".5rem" }}>
      <h4 style={{ paddingBlock: "1rem" }}>
        Restaurants with online food delivery in Delhi
      </h4>
      <AllRestaurants list={restaurants} />
    </div>
  );
};

export default RestaurantListing;
