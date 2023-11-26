import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestaurantListing from "../Components/RestaurantListing";
import { fetchMoreRestaurants, fetchRestaurants } from "../Store/apiCalls";

const Home = function () {
  const nextOffset = useSelector((store) => store.restaurants.nextOffset);
  const page = useSelector((store) => store.restaurants.page);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (nextOffset === null) fetchRestaurants(dispatch);
  }, []);
  useEffect(() => {
    const handler = function () {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.offsetHeight
      ) {
        fetchMoreRestaurants(dispatch, nextOffset, page);
      }
    };
    document.addEventListener("scroll", handler);
    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, [nextOffset, page]);
  return <RestaurantListing />;
};

export default Home;
