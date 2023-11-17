import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./Components/Header";
import store from "./Store/store";
import useConnection from "./Store/Hooks/useConnection";
import "./App.css";

const App = function () {
  const isOffline = useConnection(false);
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      {isOffline && (
        <div className="connectionModal">
          <span>Connection Error</span>
          <span>Please check your internet connection and try again.</span>
        </div>
      )}
    </Provider>
  );
};

export default App;
