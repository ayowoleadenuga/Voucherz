import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardApp from "./DashboardApp";
ReactDOM.render(
  <Router>
    <DashboardApp />
  </Router>,
  document.getElementById("root")
);
