import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";

import VEG from "../Constants/Assets/veg.png";
import NONVEG from "../Constants/Assets/nonveg.png";
import { IMAGE_API } from "../Constants/endPoints";
import styles from "./MenuItem.module.css";
import { addItem } from "../Store/Slices/cartSlice";

const MenuItem = function ({ item }) {
  const dispatch = useDispatch();
  const currentRestaurant = useSelector((store) => store.app.currentRestaurant);
  const cartRestaurant = useSelector((store) => store.cart.restaurant);
  let { info } = item?.card;
  let { isVeg, isBestseller, price, name, description, imageId } = info;

  const handleClick = function () {
    if (cartRestaurant === null || currentRestaurant.id === cartRestaurant.id) {
      const details = {
        restaurant: currentRestaurant,
        item: { isVeg, name, price: price / 100 },
        quantity: 1,
      };
      dispatch(addItem(details));
    } else {
      alert("you can add only from one restaurant");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.details}>
          <div className={styles.tag}>
            <span>{isVeg ? <img src={VEG} /> : <img src={NONVEG} />}</span>
            {isBestseller && (
              <span className={styles.bestseller}>
                <span>
                  <StarIcon fontSize="10px" />
                </span>
                <span>Bestseller</span>
              </span>
            )}
          </div>
          <div>{name}</div>
          <p>₹ {price / 100}</p>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.image}>
          <img src={IMAGE_API(imageId)} alt={name} />
          <button className={styles.add} onClick={handleClick}>
            ADD
          </button>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default MenuItem;
