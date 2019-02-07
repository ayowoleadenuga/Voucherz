import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticated =  localStorage.getItem(ACCESS_TOKEN) ? true : false;
  return <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
};

export default PrivateRoute;
