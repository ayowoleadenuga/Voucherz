import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleOpen = show => {
    this.setState({ open: show });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {this.handleOpen(this.props.status)}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"NOTIFICATION"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {this.props.status === 201 ? (
              <Button onClick={this.handleClose} color="primary">
                Proceed to voucher table
              </Button>
            ) : (
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Close
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AlertDialog.propTypes = {
  status: PropTypes.bool,
  content: PropTypes.string
};

export default AlertDialog;
