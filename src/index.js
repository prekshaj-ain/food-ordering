import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SingleRestaurant from "./Pages/SingleRestaurant";
import Home from "./Pages/Home";

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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appLayout} />);
