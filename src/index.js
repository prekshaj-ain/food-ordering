import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";

import App from "./App";
import SingleRestaurant from "./Pages/SingleRestaurant";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import SearchPage from "./Pages/SearchPage";

let appLayout = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/restaurants/:id",
        element: <SingleRestaurant />,
      },
      {
        path: "/checkout",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appLayout} />);
