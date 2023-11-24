# Food on Wheels

Food on Wheels is a react application that uses swiggy api to provide a fast, user-friendly, responsive interface for browsing, searching, advance filtering and ordering food from various restaurants powered by redux-toolkit for state management.

## Features

- **Restaurant Listings:** Browse through a diverse range of restaurants.
- **Robust Filtering:** Various filtering options, allowing users to refine their restaurant and menu selections based on various criteria
- **Menu Items:** View detailed information about each restaurant's menu items.
- **Redux-powered search with caching and debouncing :** Previous suggestions results are cached in the Redux store, allowing users to swiftly access recent searches and eliminating the need to re-fetch data. This improves efficiency and makes the application more user-friendly.
- **Real-time Connection Status:** The application actively checks whether the user is online or offline in real-time.
- **Ordering System:** Add, update, remove items from the cart.
- **Consistent Ordering:** Users are guided to maintain consistency in their orders, preventing mix-ups from different restaurants.
- **Popup Notification:**In case a user attempts to add items from a different restaurant, a popup notification prompts them to either cancel the current order or merge it with the new items. This feature adds flexibility while maintaining order accuracy
- **Shimmer Effect:** To enhance visual appeal and user engagement, every page features a captivating shimmer effect.
-
- **React Router DOM for Seamless Navigation**
- **Infinite Scroll**

## Project Link

[Food on Wheels](https://food-on-wheel.netlify.app/)

## Technologies Used

- **React:** Frontend library for building user interfaces.
- **Redux-toolkit:** State management for React applications.
- **React Router:** Navigation for React applications.
- **Parcel:** Bundler for this application

## Getting Started

### Prerequisites

- npm installed
- CORS chrome extension enabled

### Installation

1. Clone the repository: `git clone https://github.com/yourusername/food-on-wheels.git`
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
