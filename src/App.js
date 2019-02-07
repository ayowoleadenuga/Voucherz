import React, { Component } from "react";
import DashboardApp from "./DashboardApp";
import { getCurrentUser } from "./util/APIUtils";
import { ACCESS_TOKEN } from "./constants/index";
import {
  withRouter,
  Route,
  BrowserRouter,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./user/login/Login";
import Signup from "./user/signup/Signup";
import * as ROUTES from "./routes/base";
import NotFound from "./common/NotFound";
import PrivateRoute from "./common/PrivateRoute";
import LoadingIndicator from "./common/LoadingIndicator";
import ForgotPassword from "./user/forgotP";
import { notification } from "antd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: "topRight",
      top: 70,
      duration: 10
    });
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  // componentDidMount() {
  //   this.loadCurrentUser();
  // }

  handleLogout(
    redirectTo = "/",
    notificationType = "success",
    description = "You're successfully logged out."
  ) {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    // eslint-disable-next-line react/prop-types
    this.props.history.push(redirectTo);
    notification[notificationType]({
      message: "Voucherz",
      description: description
    });
  }

  handleLogin() {
    notification.success({
      message: "Voucherz",
      description: "You're successfully logged in."
    });
    // this.loadCurrentUser();
    this.props.history.push("/dashboard");
    // return <Redirect to="/dashboard" />;
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path={ROUTES.LANDING}
            render={props => <Login onLogin={this.handleLogin} {...props} />}
          />
          <Route
            path={ROUTES.SIGN_IN}
            render={props => <Login onLogin={this.handleLogin} {...props} />}
          />
          <Route path={ROUTES.SIGN_UP} component={Signup} />
          <Route path={ROUTES.FORGOT_P} component={ForgotPassword} />
          <PrivateRoute
            authenticated={this.state.isAuthenticated}
            path={ROUTES.Dashboard}
            component={DashboardApp}
            handleLogout={this.handleLogout}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
