import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import PropTypes, { any } from "prop-types";
import EditDialogDemo from "./EditVoucherModal";
import { notification } from "antd";
import { updateDisable } from "../../util/APIUtils";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 4
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 4
  },
  btnColor: {
    backgroundColor: "#0bf"
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `2px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  },
  btnColor: {
    backgroundColor: "#0bf"
  }
}))(MuiDialogActions);

class CustomizedDialogDemo extends React.Component {
  state = {
    open: false,
    disable: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleDisable = () => {
    let data = this.state.disable;
    if (data === false) {
      updateDisable(data, "disable")
        .then(response => {
          console.log(response);
          notification.success({
            message: "Voucherz",
            description: `You have successfully your disabled the voucher ${
              this.props.title
            }`
          });
        })
        .catch(error => {
          console.error(
            "Error:",
            error || "Error tryin to disable. Please try again. Thank you!"
          );
          notification.error({
            message: "Voucherz",
            description:
              "Your request cannot be made at this time as the server is currently unreachable. Click the cancel button to clear the form and try again. Thank you! " ||
              "Sorry! Something went wrong. Click the cancel button to clear the form and try again. Thank you!"
          });
        });
      this.setState({ ...this.state, disable: true });
    } else {
      updateDisable(data, "enable")
        .then(response => {
          console.log(response);
          notification.success({
            message: "Voucherz",
            description: `You have successfully your enabled the voucher ${
              this.props.title
            }`
          });
        })
        .catch(error => {
          console.error(
            "Error:",
            error || "Error tryin to enable. Please try again. Thank you!"
          );
          notification.error({
            message: "Voucherz",
            description:
              "Your request cannot be made at this time as the server is currently unreachable. Please try again. Thank you! " ||
              "Sorry! Something went wrong. Please try again!"
          });
        });
      this.setState({ ...this.state, disable: false });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          className="btnColor"
        >
          More
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Voucher Type: {this.props.voucherType}
            </Typography>
            <Typography gutterBottom>
              Campaign Name: {this.props.campaignName}
            </Typography>
            <Typography gutterBottom>
              Voucher Status: {this.props.status}
            </Typography>
            <Typography gutterBottom>
              Date Created: {this.props.dateCreated}
            </Typography>
            <Typography gutterBottom>
              Expiry Date: {this.props.expiryDate}
            </Typography>
            <Typography gutterBottom>
              Redemption Status: {this.props.redemptionStatus}
            </Typography>
          </DialogContent>
          <DialogActions>
            <EditDialogDemo
              voucherCode={this.props.voucherCode}
              voucherType={this.props.voucherType}
              value={this.props.value}
              title={this.props.title}
              campaignName={this.props.campaignName}
              status={this.props.status}
              redemptionStatus={this.props.redemptionStatus}
              dateCreated={this.props.dateCreated}
            />
            <Button
              onClick={this.handleDisable}
              color="primary"
              className="btnColor"
            >
              {this.state.disable ? "Enable" : "Disable"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
CustomizedDialogDemo.propTypes = {
  voucherType: PropTypes.string,
  voucherCode: PropTypes.string,
  value: any,
  title: PropTypes.string,
  campaignName: PropTypes.string,
  status: PropTypes.string,
  redemptionStatus: PropTypes.string,
  dateCreated: PropTypes.string,
  expiryDate: PropTypes.string
};

export default CustomizedDialogDemo;
