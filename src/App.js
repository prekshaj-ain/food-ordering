import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./Components/Header";
import store from "./Store/store";

const App = function () {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
    </Provider>
  );
};

export default App;
