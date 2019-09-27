import React from "react";
import { hydrate } from "react-dom";
import App from "./components/app";
import createStore from "./store/index";
import { Provider } from "react-redux";
import "@babel/polyfill";

const store = createStore(window.REDUX_DATA);
const app = document.getElementById("app");
hydrate((<Provider store={store}><App /></Provider>), app);
