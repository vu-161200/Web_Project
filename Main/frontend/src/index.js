import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "100px",
  transition: transitions.SCALE,
};

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options} zindex={15000}>
      <App />
    </AlertProvider>
  </Provider>
);
