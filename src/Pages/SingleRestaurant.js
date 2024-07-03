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
      let response = await fetch(RESTAURANT_DETAILS(id), {
        headers: {
          "x-cors-api-key": "temp_7eed9251d3646d91ea47c4dec8334fea",
        },
      });
      let data = await response.json();
      setDetails(data.data.cards);
    }
  }, [id]);

  if (!details) return <Skeleton type="Single" />;
  let info = details.find(
    (detail) =>
      detail?.card?.card["@type"] ==
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );
  console.log(info);
  return (
    <Layout>
      <RestaurantDetails info={info} menu={details.at(-1).groupedCard} />
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
