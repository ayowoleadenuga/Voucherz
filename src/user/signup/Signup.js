import React, { Component } from "react";
import "antd/dist/antd.css";
import { signup, checkEmailAvailability } from "../../util/APIUtils";
import "./Signup.css";
import { Link } from "react-router-dom";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  lastname_MIN_LENGTH,
  lastname_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  COMPANYSIZE_MIN_LENGTH,
  COMPANYSIZE_MAX_LENGTH,
  PHONENUMBER_MIN_LENGTH,
  PHONENUMBER_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} from "../../constants";
import { Form, Input, Button, notification } from "antd";

const FormItem = Form.Item;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: ""
      },
      lastname: {
        value: ""
      },
      companySize: {
        value: ""
      },
      phoneNumber: {
        value: ""
      },
      email: {
        value: ""
      },
      password: {
        value: ""
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  }
  handleChange(e, validationFun) {
    const re = /^[0-9\b]+$/;
    if (
      e.target.value === "" ||
      re.test(e.target.value) & (e.target.value < 999)
    ) {
      this.setState({
        companySize: {
          value: e.target.value,
          ...validationFun(e.target.value)
        }
      });
    }
  }
  handlePhoneNumberChange(e, validationFun) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({
        phoneNumber: {
          value: e.target.value,
          ...validationFun(e.target.value)
        }
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const signupRequest = {
      firstName: this.state.name.value,
      email: this.state.email.value,
      companySize: this.state.companySize.value,
      phoneNumber: this.state.phoneNumber.value,
      lastName: this.state.lastname.value,
      password: this.state.password.value
    };
    signup(signupRequest)
      .then(response => {
        notification.success({
          message: "Voucherz",
          description:
            "Thank you! You're successfully registered. Please Login to continue!"
        });
        this.props.history.push("/login");
      })
      .catch(error => {
        notification.error({
          message: "Voucherz",
          description:
            error.message || "Sorry! Something went wrong. Please try again!"
        });
      });
    console.log(signupRequest);
  }

  isFormInvalid() {
    return !(
      this.state.name.validateStatus === "success" &&
      this.state.companySize.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.password.validateStatus === "success"
    );
  }

  render() {
    return (
      <div className="signup-container">
        <h1>VOUCHERZ</h1>
        <h2 className="page-title">Sign Up</h2>
        <div className="signup-content">
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <FormItem
              label="First Name"
              validateStatus={this.state.name.validateStatus}
              help={this.state.name.errorMsg}
            >
              <Input
                size="large"
                name="name"
                autoComplete="off"
                placeholder="First name"
                value={this.state.name.value}
                onChange={event =>
                  this.handleInputChange(event, this.validateName)
                }
              />
            </FormItem>
            <FormItem
              label="Last Name"
              hasFeedback
              validateStatus={this.state.lastname.validateStatus}
              help={this.state.lastname.errorMsg}
            >
              <Input
                size="large"
                name="lastname"
                autoComplete="off"
                placeholder="Last Name"
                value={this.state.lastname.value}
                onChange={event => {
                  return this.handleInputChange(event, this.validatelastname);
                }}
              />
            </FormItem>
            <FormItem
              label="Company Size"
              hasFeedback
              validateStatus={this.state.companySize.validateStatus}
              help={this.state.companySize.errorMsg}
            >
              <Input
                size="large"
                type="number"
                name="companySize"
                autoComplete="off"
                placeholder="Company Size"
                value={this.state.companySize.value}
                onChange={event => {
                  return this.handleChange(event, this.validateCompanySize);
                }}
              />
            </FormItem>
            <FormItem
              label="Phone Number"
              hasFeedback
              validateStatus={this.state.phoneNumber.validateStatus}
              help={this.state.phoneNumber.errorMsg}
            >
              <Input
                size="large"
                type="number"
                name="phoneNumber"
                autoComplete="off"
                placeholder="Phone Number"
                value={this.state.phoneNumber.value}
                onChange={event => {
                  return this.handlePhoneNumberChange(
                    event,
                    this.validatePhoneNumber
                  );
                }}
              />
            </FormItem>
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
            <FormItem
              label="Password"
              hasFeedback
              validateStatus={this.state.password.validateStatus}
              help={this.state.password.errorMsg}
            >
              <Input
                size="large"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="A password between 6 to 20 characters"
                value={this.state.password.value}
                onChange={event =>
                  this.handleInputChange(event, this.validatePassword)
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
                Sign Up
              </Button>
              Already registed? <Link to="/login">Login now!</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }

  // Validation Functions

  validateName = name => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };
  validateCompanySize = companySize => {
    if (isNaN(companySize) || companySize > 999) {
      return {
        validateStatus: "error",
        errorMsg: `Only numbers allowed`
      };
    }
    if (companySize.length < COMPANYSIZE_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Company size is too short, value cannot be less than ${COMPANYSIZE_MIN_LENGTH})`
      };
    } else if (companySize.length > COMPANYSIZE_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Company size is too much (Maximum of ${COMPANYSIZE_MAX_LENGTH} allowed.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };
  validatePhoneNumber = phoneNumber => {
    if (isNaN(phoneNumber)) {
      return {
        validateStatus: "error",
        errorMsg: `Only numbers allowed`
      };
    }
    if (phoneNumber.length < PHONENUMBER_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Phone number length is too short, value cannot be less than ${PHONENUMBER_MIN_LENGTH})`
      };
    } else if (phoneNumber.length > PHONENUMBER_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Phone number length has exceeded ${COMPANYSIZE_MAX_LENGTH})`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

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

  validatelastname = lastname => {
    if (lastname.length < lastname_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `lastname is too short (Minimum ${lastname_MIN_LENGTH} characters needed.)`
      };
    } else if (lastname.length > lastname_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `lastname is too long (Maximum ${lastname_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: null,
        errorMsg: null
      };
    }
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
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          email: {
            value: emailValue,
            validateStatus: "success",
            errorMsg: null
          }
        });
      });
  }

  validatePassword = password => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };
}

export default Signup;
