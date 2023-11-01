import styles from "./AllRestaurants.module.css";
import RestaurantCard from "./RestaurantCard";
const AllRestaurants = function ({ list }) {
  return (
    <div className={styles.list}>
      {list.map((item, index) => (
        <RestaurantCard key={item.info.id + index} details={item.info} />
      ))}
    </div>
  );
};

export default AllRestaurants;
