import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

const voucherCategories = [
  {
    value: "Discount",
    label: "Discount"
  },
  {
    value: "Value",
    label: "Value"
  },
  {
    value: "Gift",
    label: "Gift"
  }
];
const charSet = [
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
];

class BulkTextFields extends React.Component {
  state = {
    campaignName: "",
    suffix: "",
    prefix: "",
    category: "",
    charSet: "",
    voucherLength: "",
    startDate: "",
    expiryDate: "",
    quantity: ""
  };
  handleChange = category => event => {
    this.setState({
      [category]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="filled-select-voucher-category"
          select
          label="Category"
          required
          className={classes.textField}
          value={this.state.category}
          onChange={this.handleChange("category")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your Voucher category"
          margin="normal"
          variant="filled"
        >
          {voucherCategories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="filled-select-voucher-charSet"
          select
          label="Charset"
          className={classes.textField}
          value={this.state.charSet}
          onChange={this.handleChange("charSet")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your Voucher character set"
          margin="normal"
          variant="filled"
        >
          {charSet.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="filled-name"
          label="Campaign Name"
          className={classes.textField}
          value={this.state.campaignName}
          onChange={this.handleChange("campaignName")}
          margin="normal"
          variant="filled"
          required
        />
        <TextField
          id="filled-name"
          label="Voucher Prefix (Optional)"
          className={classes.textField}
          value={this.state.prefix}
          onChange={this.handleChange("prefix")}
          margin="normal"
          variant="filled"
        />
        <TextField
          id="filled-name"
          label="Voucher suffix (Optional)"
          className={classes.textField}
          value={this.state.suffix}
          onChange={this.handleChange("suffix")}
          margin="normal"
          variant="filled"
        />
        <TextField
          id="filled-number"
          label="Voucher Length"
          value={this.state.voucherLength}
          onChange={this.handleChange("voucherLength")}
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
          id="filled-number"
          label="Voucher Quantity"
          value={this.state.quantity}
          onChange={this.handleChange("quantity")}
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
          value={this.state.startDate}
          onChange={this.handleChange("startDate")}
          type="date"
          className={classes.textField}
          variant="filled"
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="filled-date"
          label="Expiry Date"
          value={this.state.expiryDate}
          onChange={this.handleChange("expiryDate")}
          type="date"
          className={classes.textField}
          variant="filled"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <Grid xs={12}>
          <Button color="primary" round>
            Generate
          </Button>
        </Grid>
      </form>
    );
  }
}

BulkTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BulkTextFields);
