import { useEffect, useState } from "react";

import Layout from "../Components/Layout";
import RestaurantListing from "../Components/RestaurantListing";
import { HOMEPAGE_API } from "../Constants/endPoints";
import Skeleton from "../Components/Skeleton";

const Home = function () {
  let [data, setData] = useState([]);
  let [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchData = async function () {
      try {
        const response = await fetch(HOMEPAGE_API);
        const data = await response.json();
        setData(data.data.cards);
        console.log(data.data.cards);
      } catch (err) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    for (let ele of data) {
      if (ele.card.card.id === "restaurant_grid_listing") {
        setRestaurants(ele.card.card.gridElements.infoWithStyle.restaurants);
      }
    }
  }, [data]);
  if (data.length === 0) {
    return <Skeleton type="Home" />;
  }
  return (
    <Layout>
      <RestaurantListing restaurants={restaurants} />
    </Layout>
  );
};

export default Home;
