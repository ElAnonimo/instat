import * as React from "react";
import { Provider } from "react-redux";
import store from "../store";
import App2 from "./App2";

export const Wrapper: React.FC = () => {
  return (
    <Provider store={store}>
      <App2 />
    </Provider>
  );
};

export default Wrapper;
