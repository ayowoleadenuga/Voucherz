import React, { Component } from "react";
import { login } from "../../util/APIUtils";
import "antd/dist/antd.css";
import "./Login.css";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import { Form, Input, Button, Icon, notification } from "antd";

const FormItem = Form.Item;

class Login extends Component {
  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm);
    return (
      <div className="login-container">
        <h1>VOUCHERZ</h1>
        <h2 className="page-title">Login</h2>
        <div className="login-content">
          <AntWrappedLoginForm onLogin={this.props.onLogin} />
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
          .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            // eslint-disable-next-line react/prop-types
            this.props.onLogin();
          })
          .catch(error => {
            if (error.status === 401) {
              notification.error({
                message: "Voucherz",
                description:
                  "Your Email or Password is incorrect. Please try again!"
              });
            } else {
              notification.error({
                message: "Voucherz",
                description:
                  error.message ||
                  "Sorry! Something went wrong. Please try again!"
              });
            }
          });
        console.log(loginRequest);
      }
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { getFieldDecorator } = this.props.form;
    return (
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
            rules: [{ required: true, message: "Please input your Password!" }]
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
    );
  }
}

export default Login;
