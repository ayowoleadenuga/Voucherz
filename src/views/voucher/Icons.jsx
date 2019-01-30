import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Row, Col } from "reactstrap";
import Dashboard from "../Dashboard/Dashboard";
import CreateVoucher from "./CreateVoucher";

class Icons extends React.Component {
  render() {
    return (
      <div className="content">
        <Row>
          <Col md={4} offset={2}>
            <NavLink to={Dashboard}>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs={5} md={4}>
                      <div className="icon-big text-center">
                        <i className="nc-icon nc-credit-card text-success" />
                      </div>
                    </Col>
                    <Col xs={7} md={8}>
                      <div className="numbers">
                        <p className="card-category">Vouchers</p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </NavLink>
          </Col>
          <Col md={4} offset={2}>
            <NavLink to="/create">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs={5} md={4}>
                      <div className="icon-big text-center">
                        <i className="nc-icon nc-credit-card text-success" />
                      </div>
                    </Col>
                    <Col xs={7} md={8}>
                      <div className="numbers">
                        <p className="card-category">Create Vouchers</p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </NavLink>
          </Col>
        </Row>
        <CreateVoucher />
      </div>
    );
  }
}

export default Icons;
