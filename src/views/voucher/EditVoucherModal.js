import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import PropTypes, { any } from "prop-types";
import { notification } from "antd";
import * as ROUTES from "../../routes/base";

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
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
    margin: "0 auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
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

class EditDialogDemo extends React.Component {
  state = {
    open: false,
    data: {
      expiryDate: ""
    }
  };
  dateCharsethandler = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      data: {
        ...prevState.vData,
        [name]: value
      }
    }));
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    let updateData = { data: this.state.data };
    fetch("https://172.20.20.23:5001/create", {
      method: "POST",
      body: JSON.stringify(updateData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        // let res = response;
        notification.success({
          message: "Voucherz",
          description: "Thank you! You've successfully your voucher expiry date"
        });
      })
      .catch(error => {
        console.error(
          "Error:",
          error ||
            "Problem tryin to upload. Click the cancel button to clear the form and try again. Thank you!"
        );
        notification.error({
          message: "Voucherz",
          description:
            "Your request cannot be made at this time as the server is currently unreachable. Click the cancel button to clear the form and try again. Thank you! " ||
            "Sorry! Something went wrong. Click the cancel button to clear the form and try again. Thank you!"
        });
      });
    this.props.history.push(ROUTES.Dashboard + "/all-voucher-table");
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
          Edit
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
              Redemption Status: {this.props.redemptionStatus}
            </Typography>
            <Typography gutterBottom>
              <form className="container" noValidate autoComplete="off">
                <TextField
                  id="filled-date"
                  label="Expiry Date"
                  name={"expiryDate"}
                  value={this.state.data.expiryDate}
                  onChange={this.dateCharsethandler}
                  type="date"
                  className="textField"
                  required
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleFormSubmit}
              color="primary"
              className="btnColor"
            >
              Update
            </Button>
            <Button
              onClick={this.handleClose}
              color="primary"
              className="btnColor"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
EditDialogDemo.propTypes = {
  voucherCode: PropTypes.string,
  voucherType: PropTypes.string,
  value: any,
  title: PropTypes.string,
  campaignName: PropTypes.string,
  status: PropTypes.string,
  redemptionStatus: PropTypes.string,
  dateCreated: PropTypes.string,
  expiryDate: PropTypes.string
};

export default EditDialogDemo;
