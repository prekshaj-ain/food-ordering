export const HOMEPAGE_API =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7009403&lng=77.2721047&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

export const IMAGE_API = function (id) {
  return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${id}`;
};

export const RESTAURANT_DETAILS = function (id) {
  return `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7009403&lng=77.2721047&restaurantId=${id}`;
};
