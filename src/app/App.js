import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Route from "react-router-dom/Route";
import * as ROUTES from "../routes/superIndex";
import Signup from "../user/signup/Signup";
// import DashboardApp from "../DashboardApp";
import Login from "../user/login/Login";
import Dashboard from "../layouts/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path={ROUTES.Sign_In} Component={Login} />
            <Route path={ROUTES.Sign_Up} Component={Signup} />
            <Route path={ROUTES.Dashboard} Component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
