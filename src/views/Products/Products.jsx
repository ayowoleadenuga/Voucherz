import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AuditTable from "../../Tables/AuditTable";
import UsersTable from "../../Tables/Users";
// import ControlledExpansionPanels from "./Generate";
// import TableExpansionPanels from "./TableExpansionPanels";

class AdminConsole extends React.Component {
  state = {
    auditActive: true,
    userActive: true
  };
  handleAudit = () => {
    this.setState({
      auditActive: false,
      userActive: true
    });
  };
  handleUser = () => {
    this.setState({
      auditActive: true,
      userActive: false
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="content">
          <Row>
            <Col xs={6}>
              <Link to="/admin/audit-table" id="links">
                <Card
                  className="card-stats"
                  inverse
                  style={
                    !this.state.auditActive
                      ? { backgroundColor: "#333" }
                      : { backgroundColor: "#fff" }
                  }
                  onClick={this.handleAudit}
                >
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-watch-time text-primary" />
                        </div>
                      </Col>
                      <Col xs={7} md={8}>
                        <div className="numbers">
                          <p className="card-category">Audit Table</p>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col xs={6}>
              <Link to="/admin/manage-users" id="links">
                <Card
                  className="card-stats"
                  inverse
                  style={
                    !this.state.userActive
                      ? { backgroundColor: "#333" }
                      : { backgroundColor: "#fff" }
                  }
                  onClick={this.handleUser}
                >
                  <CardBody>
                    <Row>
                      <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                          <i className="nc-icon nc-single-02 text-primary" />
                        </div>
                      </Col>
                      <Col xs={7} md={8}>
                        <div className="numbers">
                          <p className="card-category">Manage Users</p>
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
              path="/admin/audit-table"
              render={() => <AuditTable />}
            />
            <Route
              exact
              path="/admin/manage-users"
              render={() => <UsersTable />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AdminConsole;
