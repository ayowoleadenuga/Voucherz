import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ControlledExpansionPanels from "./Generate";
// import VoucherTable from "../../Tables/VoucherTable";
import TableExpansionPanels from "./TableExpansionPanels";
import { IS_ACTIVE, USER_ROLE } from "../../constants";
// import { Link, Switch } from "@material-ui/core";

const isActive = localStorage.getItem(IS_ACTIVE);
const role = localStorage.getItem(USER_ROLE);
class CreateVoucher extends React.Component {
  state = {
    tableActive: true,
    createVoucherActive: true,
    disabled: isActive === false && role === "ROLE_USER" ? true : false
  };
  handleTable = () => {
    this.setState({
      tableActive: false,
      createVoucherActive: true
    });
  };
  handleCreateVoucherTable = () => {
    this.setState({
      tableActive: true,
      createVoucherActive: false
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="content">
          <Row>
            <Col xs={6}>
              <Link to="/Vouchers/voucher-table" id="links">
                <Card
                  className="card-stats"
                  inverse
                  style={
                    !this.state.tableActive
                      ? { backgroundColor: "#333" }
                      : { backgroundColor: "#fff" }
                  }
                  onClick={this.handleTable}
                >
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-bullet-list-67 text-primary" />
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
              <Link to="/Vouchers/create-vouchers" id="links">
                {!this.state.disabled ? (
                  <Card
                    className="card-stats"
                    inverse
                    style={
                      !this.state.createVoucherActive
                        ? { backgroundColor: "#333" }
                        : { backgroundColor: "#fff" }
                    }
                    onClick={this.handleCreateVoucherTable}
                  >
                    <CardBody disabled={this.state.disabled}>
                      <Row>
                        <Col xs={5} md={4}>
                          <div className="icon-big text-center">
                            <i className="nc-icon nc-simple-add text-primary" />
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
                ) : (
                  <Card
                    disabled
                    className="card-stats"
                    inverse
                    style={
                      !this.state.createVoucherActive
                        ? { backgroundColor: "#333" }
                        : { backgroundColor: "#fff" }
                    }
                  >
                    <CardBody>
                      <Row>
                        <Col xs={5} md={4}>
                          <div className="icon-big text-center">
                            <i className="nc-icon nc-simple-add text-primary" />
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
                )}
              </Link>
            </Col>
          </Row>
          <Switch>
            <Route
              exact
              path="/vouchers/voucher-table"
              render={() => <TableExpansionPanels />}
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
