import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import VEG from "../Constants/Assets/veg.png";
import NONVEG from "../Constants/Assets/nonveg.png";
import { IMAGE_API } from "../Constants/endPoints";
import styles from "./MenuItem.module.css";
import { addItem, removeItem, updateQuantity } from "../Store/Slices/cartSlice";
import Modal from "./Modal";

const MenuItem = function ({ item }) {
  const dispatch = useDispatch();
  const currentRestaurant = useSelector((store) => store.app.currentRestaurant);
  const cartRestaurant = useSelector((store) => store.cart.restaurant);
  const quantities = useSelector((store) => store.cart.quantities);
  const items = useSelector((store) => store.cart.items);
  const [showModal, setShowModal] = useState(false);
  let { info } = item?.card;
  let {
    isVeg,
    isBestseller,
    price,
    defaultPrice,
    name,
    description,
    imageId,
    id,
  } = info;

  const index = items.findIndex((item) => item.id === id);
  const details = {
    restaurant: currentRestaurant,
    item: { id, isVeg, name, price: price / 100 || defaultPrice / 100 },
    quantity: 1,
  };
  const handleClick = function () {
    if (cartRestaurant === null || currentRestaurant.id === cartRestaurant.id) {
      dispatch(addItem(details));
    } else {
      setShowModal(true);
    }
  };
  const handleIncrement = function () {
    let currQuantity = quantities[index];
    dispatch(updateQuantity({ id, quantity: currQuantity + 1 }));
  };
  const handleDecrement = function () {
    let currQuantity = quantities[index];
    if (currQuantity - 1 == 0) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity: currQuantity - 1 }));
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
          <p>₹ {price / 100 || defaultPrice / 100}</p>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.image}>
          <img src={IMAGE_API(imageId)} alt={name} />
          {quantities[index] > 0 ? (
            <div className={`${styles.add} ${styles.quantity}`}>
              <button onClick={handleDecrement}>−</button>
              <span>{quantities[index]}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          ) : (
            <button className={styles.add} onClick={handleClick}>
              ADD
            </button>
          )}
        </div>
      </div>
      <div className={styles.divider}></div>
      {showModal && <Modal setShowModal={setShowModal} details={details} />}
    </div>
  );
};

export default MenuItem;
