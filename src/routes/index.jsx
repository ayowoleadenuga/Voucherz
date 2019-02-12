import Dashboard from "layouts/Dashboard/Dashboard.jsx";
// import AdminConsole from "../views/Products/Products";
// import AuditTable from "../Tables/AuditTable";
// import UsersTable from "../Tables/Users";
// import ControlledExpansionPanels from "../views/voucher/Generate"
// import TableExpansionPanels from "../views/voucher/TableExpansionPanels";
// import Login from "../user/login/Login";

var indexRoutes = [
  { path: "/", name: "Home", component: Dashboard }
  // { path: "/admin", name: "Admin", component: AdminConsole },
  // { path: "/admin/audit-table", name: "Audit", component: AuditTable },
  // { path: "/admin/manage-users", name: "Users", component: UsersTable },
  // {
  //   path: "Vouchers/create-vouchers",
  //   name: "Vouchers",
  //   component: ControlledExpansionPanels
  // },
  // {
  //   path: "Vouchers/voucher-table",
  //   name: "Vouchers",
  //   component: TableExpansionPanels
  // }
];

export default indexRoutes;
