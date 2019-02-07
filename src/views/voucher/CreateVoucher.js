import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ControlledExpansionPanels from "./Generate";
import VoucherTable from "../../Tables/VoucherTable";
// import { Link, Switch } from "@material-ui/core";

class CreateVoucher extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="content">
          <Row>
            <Col xs={6}>
              <Link to="/Vouchers/voucher-table">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-credit-card text-primary" />
                        </div>
                      </Col>
                      <Col xs={7} md={8}>
                        <div className="numbers">
                          <p className="card-category">Voucher Tables</p>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col xs={6}>
              <Link to="/Vouchers/create-vouchers">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-credit-card text-primary" />
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
              </Link>
            </Col>
          </Row>
          <Switch>
            <Route
              exact
              path="/vouchers/voucher-table"
              render={() => <VoucherTable />}
            />
            <Route
              exact
              path="/vouchers/create-vouchers"
              render={() => <ControlledExpansionPanels />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default CreateVoucher;
