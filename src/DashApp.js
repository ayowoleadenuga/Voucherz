import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss";
import "assets/demo/demo.css";
import ControlledExpansionPanels from "./views/voucher/Generate";
// import indexRoutes from "routes/index.jsx";
import DashboardApp from "./DashboardApp";
import AdminConsole from "./views/Products/Products";
import AuditTable from "./Tables/AuditTable";
import UsersTable from "./Tables/Users";
import TableExpansionPanels from "./views/voucher/TableExpansionPanels";

const hist = createBrowserHistory();

class DashApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };
  }
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route path="/" component={DashboardApp} />
          <Route path="/admin" component={AdminConsole} />
          <Route path="/admin/audit-table" component={AuditTable} />
          <Route path="/admin/manage-users" component={UsersTable} />
          <Route
            path="/Vouchers/create-vouchers"
            component={ControlledExpansionPanels}
          />
          <Route
            path="/Vouchers/voucher-table"
            component={TableExpansionPanels}
          />
        </Switch>
      </Router>
    );
  }
}

export default DashApp;
