import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";
import * as ROUTES from "../../routes/base";
import dashRoutes from "../../routes/dashboard.jsx";
import { ACCESS_TOKEN } from "../../constants/index.js";
import { notification, Button } from "antd";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
      currentUser: null,
      isAuthenticated: false
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "dark"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  getBrand() {
    var name;
    dashRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.refs.sidebarToggle.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.refs.sidebarToggle.classList.toggle("toggled");
    }
  }
  handleLogout(
    redirectTo = "/",
    notificationType = "success",
    description = "You're successfully logged out."
  ) {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    // eslint-disable-next-line react/prop-types
    this.location.reload();
    this.props.history.push(redirectTo);
    notification[notificationType]({
      message: "Voucherz",
      description: description
    });
  }
  handleClick = e => {
    e.preventDefault();
    this.props.history.push("/voucher");
  };
  render() {
    let time = new Date();
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref="sidebarToggle"
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <Nav navbar>
              <NavItem className="nav-link btn-magnify">
                <Link to="" className="nav-link btn-magnify">
                  <p>{time.toLocaleString()}</p>
                </Link>
              </NavItem>
              <NavItem className="nav-link btn-magnify">
                <Button
                  id="customButton"
                  className="nav-link btn-magnify text-center text-primary text-header"
                  onClick={this.handleClick}
                >
                  <i className="nc-icon nc-simple-add" /> Create Voucher
                </Button>
              </NavItem>
              <NavItem className="nav-link btn-magnify">
                <Link
                  to={ROUTES.LANDING}
                  onClick={this.handleLogout}
                  className="nav-link btn-rotate"
                >
                  <i className="nc-icon nc-button-power" />
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
