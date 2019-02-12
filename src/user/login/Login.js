import React, { Component } from "react";
import { login } from "../../util/APIUtils";
import { withRouter, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./Login.css";
import {
  ACCESS_TOKEN,
  CURRENT_USER,
  IS_ACTIVE,
  USER_LASTNAME,
  USER_ROLE
} from "../../constants";
import { Form, Input, Button, Icon, notification } from "antd";
import logo from "../../components/Sidebar/logo.svg";
import { ScaleLoader } from "react-spinners";
import jwt_decode from "jwt-decode";

const FormItem = Form.Item;
const override = {
  display: "block",
  margin: "50px 45%",
  borderColor: "red"
};

class Login extends Component {
  handleLogin = () => {
    this.props.history.push("dashboard");
  };
  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm);
    return (
      <div className="login-container">
        <img src={logo} alt="react-logo" />
        <h2 className="page-title">Login</h2>
        <div className="login-content">
          <AntWrappedLoginForm onLogin={this.handleLogin} />
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    // eslint-disable-next-line react/prop-types
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
          .then(response => {
            console.log(response);
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            let decoded = jwt_decode(response.accessToken);
            console.log(decoded);
            localStorage.setItem(CURRENT_USER, decoded.email);
            localStorage.setItem(USER_LASTNAME, decoded.jti);
            localStorage.setItem(USER_ROLE, decoded.role[0].authority);
            localStorage.setItem(IS_ACTIVE, response.isActive);

            // eslint-disable-next-line react/prop-types
            this.props.onLogin();
            this.setState({ isLoading: false });
          })
          .catch(error => {
            if (error.status === 401) {
              notification.error({
                message: "Voucherz",
                description:
                  "Your Email or Password is incorrect. Please try again!"
              });
              this.setState({ isLoading: false });
            } else {
              notification.error({
                message: "Voucherz",
                description:
                  error.message ||
                  "Sorry! Something went wrong. Please try again!"
              });
              this.setState({ isLoading: false });
            }
          });
      }
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {!this.state.isLoading ? (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Please input your email!"
                  }
                ]
              })(
                <Input
                  id="login-1"
                  prefix={<Icon type="user" />}
                  size="large"
                  name="email"
                  placeholder="Email"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  id="login-1"
                  prefix={<Icon type="lock" />}
                  size="large"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="login-form-button"
              >
                Login{" "}
              </Button>
              <p>
                <Link to="/forgot">Recover Password?</Link>
              </p>
              Or click to <Link to="/signup">Register now!</Link>
            </FormItem>
          </Form>
        ) : (
          <ScaleLoader
            css={override}
            color={"#0bf"}
            size={300}
            sizeUnit={"px"}
          />
        )}
      </div>
    );
  }
}

export default withRouter(Login);
