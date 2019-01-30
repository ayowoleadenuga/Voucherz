import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
// import Button from "components/CustomButton/CustomButton.jsx";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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

class DiscountTextFields extends React.Component {
  state = {
    vData: {
      campaignName: "",
      discountType: "",
      discountUnit: "",
      amount: "",
      suffix: "",
      prefix: "",
      charSet: "",
      voucherLength: "",
      startDate: "",
      expiryDate: ""
    },
    voucherType: "Discount",
    discountTypes: [
      {
        value: "Percentage",
        label: "Percentage"
      },
      {
        value: "Amount",
        label: "Amount"
      },
      {
        value: "Unit",
        label: "Unit"
      }
    ],
    voucherCategory: "Standalone",
    charSet: [
      {
        value: "Numeric",
        label: "Numeric"
      },
      {
        value: "Alpha-Numeric",
        label: "Alpha-Numeric"
      },
      {
        value: "Alphabet",
        label: "Alphabet"
      }
    ],
    disabled: false
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
        campaignName: "",
        discountType: "",
        discountUnit: "",
        amount: "",
        suffix: "",
        prefix: "",
        charSet: "",
        voucherLength: "",
        startDate: "",
        expiryDate: ""
      },
      voucherType: "Discount",
      discountTypes: [
        {
          value: "Percentage",
          label: "Percentage"
        },
        {
          value: "Amount",
          label: "Amount"
        },
        {
          value: "Unit",
          label: "Unit"
        }
      ],
      voucherCategory: "Standalone",
      charSet: [
        {
          value: "Numeric",
          label: "Numeric"
        },
        {
          value: "Alpha-Numeric",
          label: "Alpha-Numeric"
        },
        {
          value: "Alphabet",
          label: "Alphabet"
        }
      ],
      disabled: false
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
  handleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };
  render() {
    const { classes } = this.props;

    return (
      <Grid md={12}>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid md={12}>
            <TextField
              id="filled-select-voucher-charSet"
              select
              label="Charset"
              name={"charSet"}
              className={classes.textField}
              value={this.state.vData.charSet}
              onChange={this.dateCharsethandler}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select your Voucher character set"
              margin="normal"
              variant="filled"
            >
              {this.state.charSet.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="filled-select-discount-type"
              select
              label="Discount Type"
              name={"discountType"}
              className={classes.textField}
              value={this.state.vData.discountType}
              onChange={this.dateCharsethandler}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select your Voucher character set"
              margin="normal"
              variant="filled"
            >
              {this.state.discountTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="filled-number"
              label="Voucher Amount or Percentage value"
              name={"amount"}
              value={this.state.vData.amount}
              helperText="Please input the discount amount/percentage"
              disabled={
                this.state.vData.discountType === "Percentage" ||
                this.state.vData.discountType === "Amount"
                  ? ""
                  : "disabled"
              }
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="filled"
              required
            />
          </Grid>
          <Grid md={12}>
            <TextField
              id="filled-name"
              label="Discount Unit"
              name={"discountUnit"}
              className={classes.textField}
              value={this.state.vData.discountUnit}
              disabled={
                this.state.vData.discountType === "Unit" ? "" : "disabled"
              }
              helperText="Please input the discount unit"
              onChange={this.handleChangeText}
              margin="normal"
              variant="filled"
              required
            />
            <TextField
              id="filled-name"
              label="Campaign Name"
              name={"campaignName"}
              className={classes.textField}
              value={this.state.vData.campaignName}
              helperText="Please input the Voucher's campaign name"
              onChange={this.handleChangeText}
              margin="normal"
              variant="filled"
              required
            />
            <TextField
              id="filled-name"
              label="Voucher Prefix (Optional)"
              name={"prefix"}
              className={classes.textField}
              value={this.state.vData.prefix}
              onChange={this.handleChangeText}
              margin="normal"
              variant="filled"
            />
          </Grid>
          <Grid md={12}>
            <TextField
              id="filled-name"
              label="Voucher suffix (Optional)"
              name={"suffix"}
              className={classes.textField}
              value={this.state.vData.suffix}
              onChange={this.handleChangeText}
              margin="normal"
              variant="filled"
            />
            <TextField
              id="filled-number"
              label="Voucher Length"
              name={"voucherLength"}
              value={this.state.vData.voucherLength}
              helperText="Please input the Voucher length"
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="filled"
              required
            />
            <TextField
              id="filled-date"
              label="Start Date"
              name={"startDate"}
              value={this.state.vData.startDate}
              onChange={this.dateCharsethandler}
              type="date"
              className={classes.textField}
              variant="filled"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid md={12}>
            <TextField
              id="filled-date"
              label="Expiry Date"
              name={"expiryDate"}
              value={this.state.vData.expiryDate}
              onChange={this.dateCharsethandler}
              type="date"
              className={classes.textField}
              variant="filled"
              required
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid md={12}>
            <Button
              color="primary"
              variant="contained"
              className={`${classes.button} ${classes.btnColor}`}
            >
              Generate
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.handleClearForm}
            >
              <i className="nc-icon nc-simple-remove" />
            </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

DiscountTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DiscountTextFields);
