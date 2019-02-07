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
import PropTypes from "prop-types";
import { notification } from "antd";

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

class UserDialogDemo extends React.Component {
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
      let url =
        "https://172.20.20.23:5001/disable/" +
        this.props.title +
        "?Merchant=Enunwah";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log(response);
          notification.success({
            message: "Voucherz",
            description: `You have successfully your disabled user ${
              this.props.lastName
            }`
          });
        })
        .catch(error => {
          console.error(
            "Error:",
            error || "Error tryin to disable user. Please try again. Thank you!"
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
      let url =
        "https://172.20.20.23:5001/enable/" +
        this.props.title +
        "?Merchant=Enunwah";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
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
            User
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              First-Name: {this.props.firstName}
            </Typography>
            <Typography gutterBottom>
              Last-Name: {this.props.lastName}
            </Typography>
            <Typography gutterBottom>Email: {this.props.email}</Typography>
            <Typography gutterBottom>
              Date Created: {this.props.dateCreated}
            </Typography>
            <Typography gutterBottom>Role: {this.props.role}</Typography>
          </DialogContent>
          <DialogActions>
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
UserDialogDemo.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  dateCreated: PropTypes.string
};

export default UserDialogDemo;
