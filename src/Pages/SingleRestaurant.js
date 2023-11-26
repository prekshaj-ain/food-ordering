import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Layout from "../Components/Layout";
import { RESTAURANT_DETAILS } from "../Constants/endPoints";
import RestaurantDetails from "../Components/RestaurantDetails";
import Skeleton from "../Components/Skeleton";
import styles from "./SingleRestaurant.module.css";

const SingleRestaurant = function () {
  const subTotal = useSelector((store) => store.cart.subTotal);
  const items = useSelector((store) => store.cart.items);
  let { id } = useParams();
  let [details, setDetails] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchRestaurant();
    async function fetchRestaurant() {
      let response = await fetch(RESTAURANT_DETAILS(id));
      let data = await response.json();
      setDetails(data.data.cards);
    }
  }, [id]);

  if (!details) return <Skeleton type="Single" />;
  return (
    <Layout>
      <RestaurantDetails
        info={details[0]}
        offers={details[1]}
        menu={details.at(-1).groupedCard}
      />
      {items.length > 0 && (
        <footer className={styles.cartFooter}>
          <div>
            <span>
              {items.length} Items | ₹{subTotal.toFixed(2)}
            </span>
            <Link to="/checkout">VIEW CART</Link>
          </div>
        </footer>
      )}
    </Layout>
  );
};

export default SingleRestaurant;
