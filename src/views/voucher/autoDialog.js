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
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `2px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

class AutoDialogDemo extends React.Component {
  state = {
    open: this.props.show
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          More
        </Button> */}
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Notification
          </DialogTitle>
          <DialogContent>
            {!this.props.status ? (
              <Typography gutterBottom>
                `{this.props.voucherType} has been created successfully`
              </Typography>
            ) : (
              <Typography gutterBottom>
                An error has occured, please try again.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disable
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AutoDialogDemo.propTypes = {
  voucherType: PropTypes.string,
  status: PropTypes.bool,
  show: PropTypes.bool
};

export default AutoDialogDemo;
