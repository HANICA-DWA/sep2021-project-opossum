import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Options } from "./views/Options";
import { setupStore, store } from "./services";

// Dit zou netter moeten kunnen, wellicht met een Higher Order Component?
// Het probleem zit in store.js: storeCreatorFactory is async. Hoe import je een object async? Dus eerst wachten tot het object geimport is en daarna pas renderen.
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Options />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
