import React, { Component } from "react";
import "./NotFound.css";
// import { Link } from "react-router-dom";
// import { Button } from "antd";

class NoAccess extends Component {
  render() {
    return (
      <div className="page-not-found">
        <h1 className="title">ACCESS DENIED!!!</h1>
        <div className="desc">
          The Page you are looking for is only for authorised users.
        </div>
        {/* <Link to="/">
          <Button className="go-back-btn" type="primary" size="large">
            Go Back
          </Button>
        </Link> */}
      </div>
    );
  }
}

export default NoAccess;
