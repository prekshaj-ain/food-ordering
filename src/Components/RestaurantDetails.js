import RestaurantHeader from "./RestaurantHeader";
import RestaurantMenu from "./RestaurantMenu";

const RestaurantDetails = function (props) {
  return (
    <div>
      <RestaurantHeader info={props.info?.card?.card?.info} />
      <RestaurantMenu menu={props.menu?.cardGroupMap?.REGULAR} />
    </div>
  );
};

export default RestaurantDetails;
