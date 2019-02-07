import Dashboard from "views/Dashboard/Dashboard.jsx";
import CreateVoucher from "../views/voucher/CreateVoucher";
import Products from "../views/Products/Products";
import Mail from "../views/Mail/Mail";
import Redemption from "../views/Redemption/Redemption";
import Customers from "../views/Customers/Customers";
import UserAccount from "../views/Account/UserAccount";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard
  },
  {
    path: "/voucher",
    name: "Voucher",
    icon: "nc-icon nc-credit-card",
    component: CreateVoucher
  },
  {
    path: "/user-page",
    name: "Account Settings",
    icon: "nc-icon nc-single-02",
    component: UserAccount
  },
  {
    path: "/tables",
    name: "Customers",
    icon: "nc-icon nc-tile-56",
    component: Customers
  },
  {
    path: "/admin",
    name: "admin",
    icon: "nc-icon nc-settings",
    component: Products
  },
  {
    path: "/redemption",
    name: "Redemption",
    icon: "nc-icon nc-cart-simple",
    component: Redemption
  },
  { path: "/mail", name: "Mail", icon: "nc-icon nc-email-85", component: Mail },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
