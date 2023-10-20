import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import RestaurantListing from "../Components/RestaurantListing";
import { HOMEPAGE_API } from "../Constants/endPoints";

const Home = function () {
  let [data, setData] = useState([]);
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
  if (data.length === 0) {
    return <Layout>Loading...</Layout>;
  }
  return (
    <Layout>
      <RestaurantListing
        restaurants={
          data[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        }
      />
    </Layout>
  );
};

export default Home;
