import { HOMEPAGE_API, SEARCH_SUGGESTIONS } from "../Constants/endPoints";
import {
  FETCH_FAIL,
  FETCH_START,
  FETCH_SUCCESS,
} from "./Slices/restaurantsSlice";
import {
  SEARCHRESULTS_FETCH_FAIL,
  SEARCHRESULTS_FETCH_START,
  SEARCHRESULTS_FETCH_SUCCESS,
} from "./Slices/searchSlice";
import {
  SUGGESTIONS_FETCH_FAIL,
  SUGGESTIONS_FETCH_START,
  cacheResults,
} from "./Slices/suggestionsSlice";

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
    console.log(collection);
    let ids = collection?.map((ele) =>
      ele.action.link.split("?")[1].substr(14)
    );
    dispatch(FETCH_SUCCESS({ restaurants, nextOffset, ids }));
  } catch (err) {
    dispatch(FETCH_FAIL(err));
  }
};

export const fetchMoreRestaurants = async (dispatch, offset, id) => {
  dispatch(FETCH_START());
  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7009403&lng=77.2721047&collection=${id}&sortBy=&filters=&offset=0&page_type=null`
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

export const fetchSuggestions = async function (dispatch, query) {
  try {
    dispatch(SUGGESTIONS_FETCH_START());
    const response = await fetch(SEARCH_SUGGESTIONS + query);
    const data = await response.json();
    const suggestions = data.data?.suggestions;
    const active = suggestions.filter(
      (data) => !data.hasOwnProperty("disabled") || data["disabled"] === false
    );
    dispatch(cacheResults({ [query]: active }));
  } catch (err) {
    dispatch(SUGGESTIONS_FETCH_FAIL(err));
  }
};

export const fetchSearchResults = async function (dispatch, relatedInfo) {
  console.log(relatedInfo);
  if (relatedInfo.submitAction === "ENTER") {
    if (relatedInfo.type === "Retaurant") {
      try {
        dispatch(SEARCHRESULTS_FETCH_START());
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7009403&lng=77.2721047&str=${relatedInfo.str}&trackingId=undefined&submitAction=ENTER`
        );
        const data = await response.json();
        const info = data.data.cards.at(-1).groupedCard.cardGroupMap.RESTAURANT;
        console.log(info);
      } catch (err) {
        dispatch(SEARCHRESULTS_FETCH_FAIL(err));
      }
    } else if (relatedInfo.type === "Dish") {
      try {
        dispatch(SEARCHRESULTS_FETCH_START());
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7009403&lng=77.2721047&str=${relatedInfo.str}&trackingId=undefined&submitAction=ENTER&selectedPLTab=DISH`
        );
        const data = await response.json();
        const info = data.data.cards.at(-1).groupedCard.cardGroupMap.DISH;
        console.log(info);
      } catch (err) {
        dispatch(SEARCHRESULTS_FETCH_FAIL(err));
      }
    }
  } else if (relatedInfo.submitAction === "SUGGESTION") {
    if (relatedInfo.type === "Restaurant") {
      try {
        dispatch(SEARCHRESULTS_FETCH_START());
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7009403&lng=77.2721047&str=${relatedInfo.str}&trackingId=undefined&submitAction=SUGGESTION&${relatedInfo.metadata}&selectedPLTab=RESTAURANT`
        );
        const data = await response.json();
        const info = data.data.cards.at(-1).groupedCard.cardGroupMap.RESTAURANT;
        dispatch(SEARCHRESULTS_FETCH_SUCCESS(info.cards));
        console.log(info);
      } catch (err) {
        dispatch(SEARCHRESULTS_FETCH_FAIL(err));
      }
    } else if (relatedInfo.type === "Dish") {
      try {
        dispatch(SEARCHRESULTS_FETCH_START());
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7009403&lng=77.2721047&str=${relatedInfo.str}&trackingId=undefined&submitAction=SUGGESTION&${relatedInfo.metadata}&selectedPLTab=DISH`
        );
        const data = await response.json();
        const info = data.data.cards.at(-1).groupedCard.cardGroupMap.DISH;
        info.cards.shift();
        dispatch(SEARCHRESULTS_FETCH_SUCCESS(info.cards));
        console.log(info);
      } catch (err) {
        dispatch(SEARCHRESULTS_FETCH_FAIL(err));
      }
    }
  }
};
