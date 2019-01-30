import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DiscountBTextFields from "./DiscountFormBulk";
import ValueBTextFields from "./ValueFormBulk";
import GiftBTextFields from "./GiftFormBulk";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class BulkExpansionPanels extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Value Voucher</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ValueBTextFields />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Discount Voucher
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <DiscountBTextFields />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={this.handleChange("panel3")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Gift Voucher</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <GiftBTextFields />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

BulkExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BulkExpansionPanels);
