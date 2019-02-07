import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// import DashboardApp from "./DashboardApp";
// import App from "./app/App";
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
