import React, { Component } from "react";
import "antd/dist/antd.css";
import "./forgotP.css";
import { Form, Input, Button, notification } from "antd";
import { forgotPassword, checkEmailAvailability } from "../util/APIUtils";
import { Link } from "react-router-dom";
import { EMAIL_MAX_LENGTH } from "../constants";

const FormItem = Form.Item;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
  }
  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputValue = target.value;

    this.setState({
      email: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const forgotPasswordRequest = {
      email: this.state.email.value
    };
    forgotPassword(forgotPasswordRequest)
      .then(response => {
        if (response.status === 202 || response.status === 201) {
          notification.success({
            message: "Voucherz",
            description: "Thank you! A link has been sent to your mail!"
          });
          // eslint-disable-next-line react/prop-types
          this.props.history.push("/login");
        }
      })
      .catch(error => {
        notification.error({
          message: "Voucherz",
          description:
            error.message || "Sorry! Something went wrong. Please try again!"
        });
      });
  }

  isFormInvalid() {
    return !(this.state.email.validateStatus === "success");
  }
  render() {
    return (
      <div className="forgot-container">
        <h1>VOUCHERZ</h1>
        <h2 className="page-title">Forgot Password?</h2>
        <div className="signup-content">
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <FormItem
              label="Email"
              hasFeedback
              validateStatus={this.state.email.validateStatus}
              help={this.state.email.errorMsg}
            >
              <Input
                size="large"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Your email"
                value={this.state.email.value}
                onBlur={this.validateEmailAvailability}
                onChange={event =>
                  this.handleInputChange(event, this.validateEmail)
                }
              />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="signup-form-button"
                disabled={this.isFormInvalid()}
              >
                Submit
              </Button>
              Back to <Link to="/login">Login Page</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }

  validateEmail = email => {
    if (!email) {
      return {
        validateStatus: "error",
        errorMsg: "Email may not be empty"
      };
    }

    const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Email not valid"
      };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
      };
    }
    return {
      validateStatus: null,
      errorMsg: null
    };
  };
  validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if (emailValidation.validateStatus === "error") {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation
        }
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: "validating",
        errorMsg: null
      }
    });

    checkEmailAvailability(emailValue)
      .then(response => {
        if (response.available) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "success",
              errorMsg: null
            }
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "error",
              errorMsg: "This Email is already registered"
            }
          });
        }
      })
      .catch(error => {
        // Marking validateStatus as success, Form will be rechecked at server
        this.setState({
          email: {
            value: emailValue,
            validateStatus: "success",
            errorMsg: null
          }
        });
      });
  }
}

export default ForgotPassword;
