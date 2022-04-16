import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { start } from "./game.js";

start();

const root = ReactDOM.createRoot(document.getElementById("ui"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
