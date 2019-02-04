import React, { Component } from "react";
import DashboardApp from "./DashboardApp";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./user/login/Login";
import Signup from "./user/signup/Signup";
import * as ROUTES from "./routes/base";
import ForgotPassword from "./user/forgotP";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path={ROUTES.LANDING} exact component={Login} />
            <Route path={ROUTES.SIGN_UP} exact component={Signup} />
            <Route path={ROUTES.SIGN_IN} exact component={Login} />
            <Route path={ROUTES.FORGOT_P} exact component={ForgotPassword} />
            <Route path={ROUTES.Dashboard} exact component={DashboardApp} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
