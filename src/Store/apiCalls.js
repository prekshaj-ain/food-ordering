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
  addRelatedInfo,
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
    let nextOffset = data.data.pageOffset.nextOffset;
    let restaurants;
    for (let ele of cards) {
      if (ele.card.card.id === "restaurant_grid_listing") {
        restaurants = ele.card.card.gridElements.infoWithStyle.restaurants;
      }
    }
    dispatch(FETCH_SUCCESS({ restaurants, nextOffset, page: 10 }));
  } catch (err) {
    dispatch(FETCH_FAIL(err));
  }
};

export const fetchMoreRestaurants = async (dispatch, offset, page) => {
  dispatch(FETCH_START());
  try {
    const response = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: 28.7009403,
          lng: 77.2721047,
          nextOffset: "COVCELQ4KICY8/SXqZnTOzClEzgC",
          seoParams: {
            apiName: "FoodHomePage",
            pageType: "FOOD_HOMEPAGE",
            seoUrl: "https://www.swiggy.com/",
          },
          widgetOffset: {
            NewListingView_Topical_Fullbleed: "",
            NewListingView_category_bar_chicletranking_TwoRows: "",
            NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
            Restaurant_Group_WebView_SEO_PB_Theme: "",
            collectionV5RestaurantListWidget_SimRestoRelevance_food_seo:
              String(page),
            inlineFacetFilter: "",
            restaurantCountWidget: "",
          },
        }),
      }
    );
    const data = await response.json();
    let restaurants =
      data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants;
    let nextOffset = data.data.pageOffset.nextOffset;
    dispatch(FETCH_SUCCESS({ restaurants, nextOffset, page: page + 15 }));
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

export const fetchSearchResults = async function (dispatch, str, type) {
  try {
    dispatch(SEARCHRESULTS_FETCH_START());
    const data = await fetch(
      `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9715987&lng=77.5945627&str=${str}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=bc9bbc65-5d8b-0aa5-bbdc-65b467e6afdb&selectedPLTab=${type}`
    );
    const json = await data.json();
    if (type == "RESTAURANT") {
      console.log(
        json?.data?.cards.at(-1)?.groupedCard?.cardGroupMap?.RESTAURANT
      );
      dispatch(
        SEARCHRESULTS_FETCH_SUCCESS(
          json?.data?.cards.at(-1)?.groupedCard?.cardGroupMap?.RESTAURANT.cards
        )
      );
    } else if (type == "DISH") {
      let info = json?.data?.cards.at(-1)?.groupedCard?.cardGroupMap?.DISH;
      info.cards.shift();
      dispatch(SEARCHRESULTS_FETCH_SUCCESS(info.cards));
    }
  } catch (err) {
    dispatch(SEARCHRESULTS_FETCH_FAIL(err));
  }
};
