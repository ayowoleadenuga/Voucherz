import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ScaleLoader from "react-spinners/ScaleLoader";
import { updateProfile } from "../../util/APIUtils";
import { notification } from "antd";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
    margin: "0 auto"
  },
  button: {
    marginTop: 20,
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  btnColor: {
    backgroundColor: "#0bf"
  }
});
const override = {
  display: "block",
  margin: "140px 0 140px 400px"
};
notification.config({
  placement: "bottomRight",
  bottom: 200,
  duration: 0
});

class UserAccountFields extends React.Component {
  state = {
    vData: {
      firstName: "",
      lastName: "",
      companyName: "",
      staffStrength: "",
      email: "",
      address: "",
      phoneNumber: "",
      website: ""
    },
    isLoading: false
  };
  handleChangeText = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      vData: {
        ...prevState.vData,
        [name]: value
      }
    }));
  };
  handleChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    const validateinput = /^[+]?([0-9]+(?:[./][0-9]*)?|\.[0-9]+)$/;
    if (e.target.value === "" || validateinput.test(e.target.value)) {
      this.setState(prevState => ({
        vData: {
          ...prevState.vData,
          [name]: value
        }
      }));
    }
  };
  handleClearForm = e => {
    e.preventDefault();
    this.setState({
      vData: {
        firstName: "",
        lastName: "",
        companyName: "",
        staffStrength: "",
        email: "",
        address: "",
        phoneNumber: "",
        website: ""
      }
    });
  };
  dateCharsethandler = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      vData: {
        ...prevState.vData,
        [name]: value
      }
    }));
  };
  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({ ...this.state, isLoading: true });
    let discountData = {
      firstName: this.state.vData.firstName,
      lastName: this.state.vData.lastName,
      companyName: this.state.vData.companyName,
      staffStrength: this.state.vData.staffStrength,
      email: this.state.vData.email,
      address: this.state.vData.address,
      phoneNumber: this.state.vData.phoneNumber,
      website: this.state.vData.website
    };
    updateProfile(discountData)
      .then(response => {
        console.log(response);
        let res = response;
        if (res.code === 200) {
          this.setState({ ...this.state, isLoading: false, modalShow: true }); 
        }
        notification.success({
          message: "Voucherz",
          description:
            "Thank you! You've successfully updated your account profile"
        });
        this.setState({
          vData: {
            firstName: "",
            lastName: "",
            companyName: "",
            staffStrength: "",
            email: "",
            address: "",
            phoneNumber: "",
            website: ""
          },
          isLoading: false
        });
      })
      .catch(error => {
        console.error(
          "Error:",
          error ||
            "Problem tryin to upload. Click the clear button to clear the form and try again. Thank you!"
        );
        this.setState({
          ...this.state,
          isLoading: false,
          errorStatus: true
        });
        notification.error({
          message: "Voucherz",
          description:
            "Your request cannot be made at this time as the server is currently unreachable. Click the cancel button to clear the form and try again. Thank you! " ||
            "Sorry! Something went wrong. Click the cancel button to clear the form and try again. Thank you!"
        });
        console.log(discountData);
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="content">
        <Grid md={12}>
          {!this.state.isLoading ? (
            <form className={classes.container} noValidate autoComplete="off">
              <Grid md={12}>
                <TextField
                  id="filled-name"
                  label="First Name"
                  required
                  name={"firstName"}
                  className={classes.textField}
                  value={this.state.vData.firstName}
                  onChange={this.handleChangeText}
                  margin="normal"
                />
                <TextField
                  id="filled-name"
                  label="Last Name"
                  required
                  name={"lastName"}
                  className={classes.textField}
                  value={this.state.vData.lastName}
                  onChange={this.handleChangeText}
                  margin="normal"
                />
              </Grid>
              <Grid md={12}>
                <TextField
                  id="filled-name"
                  label="Company Name"
                  name={"companyName"}
                  className={classes.textField}
                  value={this.state.vData.companyName}
                  onChange={this.handleChangeText}
                  margin="normal"
                />
                <TextField
                  id="filled-number"
                  label="Phone Number"
                  name={"phoneNumber"}
                  value={this.state.vData.phoneNumber}
                  onChange={this.handleChange}
                  type="number"
                  className={classes.textField}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid md={12}>
                <TextField
                  id="filled-number"
                  label="Staff Strength"
                  name={"staffStrength"}
                  value={this.state.vData.staffStrength}
                  onChange={this.handleChange}
                  type="number"
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="filled-name"
                  label="Website"
                  name={"website"}
                  className={classes.textField}
                  value={this.state.vData.website}
                  onChange={this.handleChangeText}
                  margin="normal"
                />
              </Grid>
              <Grid md={12}>
                <TextField
                  id="filled-name"
                  label="Company Address"
                  name={"address"}
                  className={classes.textField}
                  value={this.state.vData.address}
                  onChange={this.handleChangeText}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid md={12}>
                <Button
                  color="primary"
                  variant="contained"
                  className={`${classes.button} ${classes.btnColor}`}
                  onClick={this.handleFormSubmit}
                >
                  update Profile
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleClearForm}
                >
                  Clear
                </Button>
              </Grid>
            </form>
          ) : (
            <Grid
              md={12}
              xs={12}
              sm={12}
              justify="center"
              alignContent="center"
            >
              <ScaleLoader
                css={override}
                color={"#0bf"}
                size={300}
                sizeUnit={"px"}
              />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

UserAccountFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserAccountFields);
