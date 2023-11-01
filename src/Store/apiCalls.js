import { HOMEPAGE_API } from "../Constants/endPoints";
import {
  FETCH_FAIL,
  FETCH_START,
  FETCH_SUCCESS,
} from "./Slices/restaurantsSlice";

export const fetchRestaurants = async (dispatch) => {
  dispatch(FETCH_START());
  try {
    const response = await fetch(HOMEPAGE_API);
    const data = await response.json();
    const cards = data.data.cards;
    let nextOffset = 0;
    let restaurants, collection;
    for (let ele of cards) {
      if (ele.card.card.id === "whats_on_your_mind") {
        collection = ele.card.card.gridElements.infoWithStyle.info;
      } else if (ele.card.card.id === "restaurant_grid_listing") {
        restaurants = ele.card.card.gridElements.infoWithStyle.restaurants;
      }
    }
    let ids = collection.map((ele) => ele.entityId.substr(36));
    dispatch(FETCH_SUCCESS({ restaurants, nextOffset, ids }));
  } catch (err) {
    dispatch(FETCH_FAIL(err));
  }
};

export const fetchMoreRestaurants = async (dispatch, offset, id) => {
  dispatch(FETCH_START());
  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7009403&lng=77.2721047&collection=${id}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
    );
    const data = await response.json();
    const cards = data.data.cards;
    let nextOffset = offset + 1;
    let restaurants = cards.filter(
      (ele) =>
        ele.card.card.hasOwnProperty("widgetId") &&
        ele.card.card.widgetId.includes("collectionV5RestaurantListWidget")
    );
    restaurants = restaurants.map((restaurant) => restaurant.card.card);

    console.log(restaurants);
    dispatch(FETCH_SUCCESS({ restaurants, nextOffset }));
  } catch (err) {
    dispatch(FETCH_FAIL(err));
  }
};
