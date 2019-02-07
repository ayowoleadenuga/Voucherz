import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
// import Stats from "components/Stats/Stats.jsx";
import VoucherTable from "../../Tables/VoucherTable";
import Discount from "../../Tables/Discount";
import ValueTable from "../../Tables/ValueTable";
import GiftTable from "../../Tables/GiftTable";

class Dashboard extends React.Component {
  state = {
    allActive: true,
    valueActive: true,
    discountActive: true,
    giftActive: true
  };
  handleAll = () => {
    this.setState({
      allActive: false,
      valueActive: true,
      discountActive: true,
      giftActive: true
    });
  };
  handleValue = () => {
    this.setState({
      allActive: true,
      valueActive: false,
      discountActive: true,
      giftActive: true
    });
  };
  handleDiscount = () => {
    this.setState({
      allActive: true,
      valueActive: true,
      discountActive: false,
      giftActive: true
    });
  };
  handleGift = () => {
    this.setState({
      allActive: true,
      valueActive: true,
      discountActive: true,
      giftActive: false
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="content">
          <Row>
            <Col xs={12} sm={3} md={3} lg={3}>
              <Link to="/all-voucher-table">
                <Card
                  className="card-stats"
                  inverse
                  style={
                    !this.state.allActive
                      ? { backgroundColor: "#333" }
                      : { backgroundColor: "#fff" }
                  }
                  onClick={this.handleAll}
                >
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-credit-card text-primary" />
                        </div>
                      </Col>
                      <Col xs={7} md={8}>
                        <div className="numbers">
                          <p className="card-category">All Vouchers</p>
                          <CardTitle tag="p">
                            {VoucherTable.voucherNumber}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col xs={12} sm={3} md={3} lg={3}>
              <Link to="/value-voucher-table">
                <Card
                  className="card-stats"
                  inverse
                  style={
                    !this.state.valueActive
                      ? { backgroundColor: "#333" }
                      : { backgroundColor: "#fff" }
                  }
                  onClick={this.handleValue}
                >
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-money-coins text-primary" />
                        </div>
                      </Col>
                      <Col xs={7} md={8}>
                        <div className="numbers">
                          <p className="card-category">Value Voucher</p>
                          <CardTitle tag="p">
                            {/* {VoucherTable.state.voucher.length} */}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={3} md={3} lg={3}>
              <Link to="/discount-voucher-table">
                <Card
                  className="card-stats"
                  inverse
                  style={
                    !this.state.discountActive
                      ? { backgroundColor: "#333" }
                      : { backgroundColor: "#fff" }
                  }
                  onClick={this.handleDiscount}
                >
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-scissors text-primary" />
                        </div>
                      </Col>
                      <Col xs={7} md={8}>
                        <div className="numbers">
                          <p className="card-category">Discount Voucher</p>
                          <CardTitle tag="p">
                            {VoucherTable.voucherNumber}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={3} md={3} lg={3}>
              <Link to="/gift-voucher-table">
                <Card
                  className="card-stats"
                  inverse
                  style={
                    !this.state.giftActive
                      ? { backgroundColor: "#333" }
                      : { backgroundColor: "#fff" }
                  }
                  onClick={this.handleGift}
                >
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-basket text-primary" />
                        </div>
                      </Col>
                      <Col xs={7} md={8}>
                        <div className="numbers">
                          <p className="card-category">Gift Voucher</p>
                          <CardTitle tag="p">
                            {VoucherTable.voucherNumber}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Switch>
                <Route
                  exact
                  path="/all-voucher-table"
                  render={() => <VoucherTable />}
                />
                <Route
                  exact
                  path="/value-voucher-table"
                  render={() => <ValueTable />}
                />
                <Route
                  exact
                  path="/discount-voucher-table"
                  render={() => <Discount />}
                />
                <Route
                  exact
                  path="/gift-voucher-table"
                  render={() => <GiftTable />}
                />
              </Switch>
              <p>Click on any card above to view their respective tables</p>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}

export default Dashboard;
