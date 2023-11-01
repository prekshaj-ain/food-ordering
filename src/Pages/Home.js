import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../Components/Layout";
import RestaurantListing from "../Components/RestaurantListing";
import { fetchMoreRestaurants, fetchRestaurants } from "../Store/apiCalls";

const Home = function () {
  const nextOffset = useSelector((store) => store.restaurants.nextOffset);
  const moreIds = useSelector((store) => store.restaurants.moreDataIds);
  const dispatch = useDispatch();
  useEffect(() => {
    if (nextOffset === null) fetchRestaurants(dispatch);
  }, []);
  useEffect(() => {
    const handler = function () {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (moreIds.length > nextOffset) {
          fetchMoreRestaurants(dispatch, nextOffset, moreIds[nextOffset]);
        }
      }
    };
    document.addEventListener("scroll", handler);
    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, [dispatch, nextOffset]);
  return (
    <Layout>
      <RestaurantListing />
    </Layout>
  );
};

export default Home;
