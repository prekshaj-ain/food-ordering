import react from "react";
import { Outlet } from "react-router-dom";

import Header from "./Components/Header";

const App = function () {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
