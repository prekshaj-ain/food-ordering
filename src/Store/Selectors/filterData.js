import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredRestaurants = createSelector(
  (store) => store.restaurants.data,
  (store) => store.restaurants.filters,
  (data, filters) => {
    let filteredData = data;
    if (filters["Ratings"] && filters["Ratings"].length > 0) {
      if (filters["Ratings"].includes("Rating 4.5+")) {
        filteredData = filteredData.filter((data) => data.info.avgRating > 4.5);
      } else if (filters["Ratings"].includes("Rating 4.0+")) {
        filteredData = filteredData.filter((data) => data.info.avgRating > 4.0);
      } else if (filters["Ratings"].includes("Rating 3.5+")) {
        filteredData = filteredData.filter((data) => data.info.avgRating > 3.5);
      }
    }
    if (filters["Veg/Non-Veg"] && filters["Veg/Non-Veg"].length > 0) {
      if (filters["Veg/Non-Veg"].includes("Veg")) {
        filteredData = filteredData.filter(
          (data) => data.info.hasOwnProperty("veg") && data.info.veg === true
        );
      } else {
        filteredData = filteredData.filter(
          (data) => !data.info.hasOwnProperty("veg")
        );
      }
    }
    if (filters["Cost for two"] && filters["Cost for two"].length > 0) {
      let originalFilteredData = filteredData;
      filteredData = [];
      if (filters["Cost for two"].includes("Rs. 300-Rs. 600")) {
        let output = originalFilteredData.filter((data) => {
          let cost = data.info.costForTwo.split(" ")[0].split("₹")[1];
          return cost >= 300 && cost <= 600;
        });
        filteredData = [...filteredData, ...output];
      }
      if (filters["Cost for two"].includes("Greater than Rs. 600")) {
        let output = originalFilteredData.filter((data) => {
          let cost = data.info.costForTwo.split(" ")[0].split("₹")[1];
          return cost > 600;
        });
        filteredData = [...filteredData, ...output];
      }
      if (filters["Cost for two"].includes("Less than Rs. 300")) {
        let output = originalFilteredData.filter((data) => {
          let cost = data.info.costForTwo.split(" ")[0].split("₹")[1];
          return cost < 300;
        });
        filteredData = [...filteredData, ...output];
      } else {
      }
    }
    if (filters["Sort"].length > 0) {
      filteredData = [...filteredData];
      if (filters["Sort"].includes("Delivery Time")) {
        filteredData.sort(
          (a, b) => a.info["sla"].deliveryTime - b.info["sla"].deliveryTime
        );
      } else if (filters["Sort"].includes("Rating")) {
        filteredData.sort((a, b) => b.info["avgRating"] - a.info["avgRating"]);
      } else if (filters["Sort"].includes("Cost: high to low")) {
        filteredData.sort((a, b) => {
          let costA = a.info["costForTwo"].split(" ")[0].split("₹")[1];
          let costB = b.info["costForTwo"].split(" ")[0].split("₹")[1];
          return costA - costB;
        });
      } else if (filters["Sort"].includes("Cost: low to high")) {
        filteredData.sort((a, b) => {
          let costA = a.info["costForTwo"].split(" ")[0].split("₹")[1];
          let costB = b.info["costForTwo"].split(" ")[0].split("₹")[1];
          return costB - costA;
        });
      } else {
      }
    } else {
    }
    return filteredData;
  }
);
