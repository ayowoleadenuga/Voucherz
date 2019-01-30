import React from "react";
import { Card, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";
import Stats from "components/Stats/Stats.jsx";
import VoucherTable from "../voucher/VoucherTable";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="content">
        <Row>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-globe text-primary" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Vouchers</p>
                      <CardTitle tag="p">7</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-sync-alt",
                      t: "Update Now"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-money-coins text-primary" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Redeemed Vouchers</p>
                      <CardTitle tag="p">3</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "far fa-calendar",
                      t: "Last day"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>

          <Col xs={12} sm={4} md={4} lg={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-circle-10 text-primary" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Customers</p>
                      <CardTitle tag="p">30</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "far fa-calendar",
                      t: "Last day"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <VoucherTable />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
