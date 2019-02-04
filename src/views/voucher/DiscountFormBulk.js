import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ScaleLoader from "react-spinners/ScaleLoader";
import AlertDialog from "./autoDialog";
// import axios from "axios";

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
  margin: "140px 0 140px 380px"
};
class DiscountBTextFields extends React.Component {
  state = {
    vData: {
      campaignName: "",
      discountType: "",
      discountUnit: "",
      quantity: "",
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
    voucherCategory: "Bulk",
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
    disabled: false,
    isLoading: false,
    modalShow: false,
    errorStatus: null
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
        quantity: "",
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
      voucherCategory: "Bulk",
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
      disabled: false,
      isLoading: false,
      modalShow: false,
      errorStatus: false
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
    this.setState({ ...this.state, isLoading: true, disabled: true });
    let discountData = {
      VoucherType: this.state.voucherType,
      Campaign: this.state.vData.campaignName,
      Discount: {
        DiscountType: this.state.vData.discountType,
        PercentOff: this.state.vData.amount,
        AmountOff: this.state.vData.amount
      },
      startDate: this.state.vData.startDate,
      expirationDate: this.state.vData.expiryDate,
      MetaData: {
        Length: this.state.vData.voucherLength,
        Charset: this.state.vData.charSet,
        Prefix: this.state.vData.prefix,
        Suffix: this.state.vData.suffix
      },
      CreatedBy: "Wole",
      VoucherCount: this.state.vData.quantity
    };
    let chinedu = JSON.stringify(discountData);
    fetch("https://172.20.20.23:5001/create", {
      method: "POST",
      body: chinedu,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // responseType: "json"
    })
      .then(response => {
        console.log(response);
        let res = response;
        if (res.status === 201 || res.status === 400) {
          this.setState({ ...this.state, isLoading: false, modalShow: true });
        }
      })
      .catch(error => {
        console.error("Error:", error || "Problem tryin to upload");
        this.setState({
          ...this.state,
          isLoading: false,
          modalShow: true,
          errorStatus: true
        });
        console.log(chinedu);
      });
  };
  handleDisable = () => {
    this.setState({ ...this.state, disabled: !this.state.disabled });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid md={12}>
        {!this.state.isLoading ? (
          <form className={classes.container} noValidate autoComplete="off">
            <AlertDialog
              status={this.state.modalShow}
              content={
                this.state.errorStatus === 201
                  ? "Vouchers created successfully."
                  : "An error has occured, please try again"
              }
            />
            <Grid md={12}>
              <TextField
                id="filled-select-voucher-charSet"
                select
                label="Select character set"
                name={"charSet"}
                className={classes.textField}
                value={this.state.vData.charSet}
                onChange={this.dateCharsethandler}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
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
                label="Select discount type"
                name={"discountType"}
                className={classes.textField}
                value={this.state.vData.discountType}
                onChange={this.dateCharsethandler}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
              >
                {this.state.discountTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="filled-number"
                label="Amount or Percentage value"
                name={"amount"}
                value={this.state.vData.amount}
                disabled={
                  this.state.vData.discountType === "Percentage" ||
                  this.state.vData.discountType === "Amount"
                    ? ""
                    : "disabled"
                }
                onChange={this.handleChange}
                type="number"
                className={classes.textField}
                margin="normal"
                required
              />
            </Grid>
            <Grid md={12}>
              <TextField
                id="filled-name"
                label="Input discount unit"
                name={"discountUnit"}
                className={classes.textField}
                value={this.state.vData.discountUnit}
                disabled={
                  this.state.vData.discountType === "Unit" ? "" : "disabled"
                }
                onChange={this.handleChangeText}
                margin="normal"
                required
              />
              <TextField
                id="filled-number"
                label="Input voucher quantity"
                name={"quantity"}
                value={this.state.vData.quantity}
                onChange={this.handleChange}
                type="number"
                className={classes.textField}
                margin="normal"
                required
              />
              <TextField
                id="filled-name"
                label="Input campaign name"
                name={"campaignName"}
                className={classes.textField}
                value={this.state.vData.campaignName}
                onChange={this.handleChangeText}
                margin="normal"
                required
              />
            </Grid>
            <Grid md={12}>
              <TextField
                id="filled-name"
                label="Voucher Prefix (Optional)"
                name={"prefix"}
                className={classes.textField}
                value={this.state.vData.prefix}
                onChange={this.handleChangeText}
                margin="normal"
              />
              <TextField
                id="filled-name"
                label="Voucher suffix (Optional)"
                name={"suffix"}
                className={classes.textField}
                value={this.state.vData.suffix}
                onChange={this.handleChangeText}
                margin="normal"
              />
              <TextField
                id="filled-number"
                label="Input code length"
                name={"voucherLength"}
                value={this.state.vData.voucherLength}
                onChange={this.handleChange}
                type="number"
                className={classes.textField}
                margin="normal"
                required
              />
            </Grid>
            <Grid md={12}>
              <TextField
                id="filled-date"
                label="Start Date"
                name={"startDate"}
                value={this.state.vData.startDate}
                onChange={this.dateCharsethandler}
                type="date"
                className={classes.textField}
                margin="normal"
                required
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="filled-date"
                label="Expiry Date"
                name={"expiryDate"}
                value={this.state.vData.expiryDate}
                onChange={this.dateCharsethandler}
                type="date"
                className={classes.textField}
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
                disabled={this.state.disabled}
                onClick={this.handleFormSubmit}
              >
                Generate
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.handleClearForm}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        ) : (
          <Grid md={12} xs={12} sm={12} justify="center" alignContent="center">
            <ScaleLoader
              css={override}
              color={"#0bf"}
              size={300}
              sizeUnit={"px"}
            />
          </Grid>
        )}
        {/* <AutoDialogDemo
          voucherType={this.state.vData.discountType}
          status={this.state.errorStatus}
          open={this.state.modalShow}
        /> */}
      </Grid>
    );
  }
}

DiscountBTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DiscountBTextFields);
