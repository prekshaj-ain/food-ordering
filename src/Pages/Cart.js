import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import VEG from "../Constants/Assets/veg.png";
import NONVEG from "../Constants/Assets/nonveg.png";
import Layout from "../Components/Layout";
import styles from "./Cart.module.css";
import { IMAGE_API } from "../Constants/endPoints";
import { removeItem, updateQuantity } from "../Store/Slices/cartSlice";
const cart = function () {
  const cart = useSelector((store) => store.cart);
  if (cart.restaurant === null) return null;
  const dispatch = useDispatch();
  const { id, name, areaName, imgId, deliveryCharge } = cart.restaurant;
  const total = cart.subTotal + deliveryCharge + 5;
  const gstPrice = (total * 0.05).toFixed(2);
  const handleIncrement = function (id, currQuantity) {
    dispatch(updateQuantity({ id, quantity: currQuantity + 1 }));
  };
  const handleDecrement = function (id, currQuantity) {
    if (currQuantity - 1 == 0) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity: currQuantity - 1 }));
    }
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.items}>
          <div className={styles.info}>
            <Link to={`/restaurants/${id}`} className={styles.restaurant}>
              <div className={styles.image}>
                <img src={IMAGE_API(imgId)} />
              </div>
              <div className={styles.restaurantDetail}>
                <h6>{name}</h6>
                <p>{areaName}</p>
              </div>
            </Link>
            {cart.items.map((item, index) => (
              <div key={item.id} className={styles.item}>
                <div>
                  <span className={styles.tag}>
                    {item.isVeg ? <img src={VEG} /> : <img src={NONVEG} />}
                  </span>
                  <h6>{item.name}</h6>
                </div>
                <div className={`${styles.add}`}>
                  <button
                    onClick={() =>
                      handleDecrement(item.id, cart.quantities[index])
                    }
                  >
                    −
                  </button>
                  <span>{cart.quantities[index]}</span>
                  <button
                    onClick={() =>
                      handleIncrement(item.id, cart.quantities[index])
                    }
                  >
                    +
                  </button>
                </div>
                <span className={styles.price}>
                  <p>₹{(item.price * cart.quantities[index]).toFixed(2)}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bill}>
          <div>
            <h6>Bill Details:</h6>
            <span>
              <p>Item Total</p>
              <p>₹{cart.subTotal.toFixed(2)}</p>
            </span>
            <span>
              <p>Delivery Fee</p>
              <p>₹{deliveryCharge}</p>
            </span>
            <hr />
            <span>
              <p>Platform Fee</p>
              <p>₹5.00</p>
            </span>
            <span>
              <p>GST Charges</p>
              <p>₹{gstPrice}</p>
            </span>
            <hr style={{ height: "3px", backgroundColor: "black" }} />
            <span>
              <h6>To Pay</h6>
              <h6>₹{(+total + +gstPrice).toFixed(2)}</h6>
            </span>
            <button>
              <div>Checkout</div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default cart;
