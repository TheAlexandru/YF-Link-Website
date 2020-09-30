import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { withNamespaces } from "react-i18next";
import { colors } from "../../../theme/theme";
import Store from "../../../stores";

const styles = (theme) => ({
  root: {
    display: "flex",
    position: "relative",
    height: "20px",
    alignItems: "center",
  },

  activeTag: {
    position: "absolute",
    top: "-22px",
    backgroundColor: colors.yellowBackground,
    padding: "2px 6px",
    borderRadius: "3px",
  },

  activeTagMobile: {
    backgroundColor: colors.yellowBackground,
    padding: "2px 6px",
    borderRadius: "3px",
    marginLeft: "5px",
  },

  disabledTag: {
    position: "absolute",
    top: "-22px",
    backgroundColor: colors.yellowBackground,
    padding: "2px 6px",
    borderRadius: "3px",
    opacity: 0.5,
  },

  disabledTagMobile: {
    backgroundColor: colors.yellowBackground,
    padding: "2px 6px",
    borderRadius: "3px",
    marginLeft: "5px",
    opacity: 0.5,
  },

  tagText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "0.06em",
    color: "#EECB70",
  },

  activeSpan: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },

  disabledSpan: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  linkText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "18px",
    lineHeight: "21px",
    letterSpacing: "0.06em",
    color: colors.white,
    whiteSpace: "nowrap",
  },

  linkTextSelectedMark: {
    position: "absolute",
    bottom: "-8px",
    width: "100%",
    height: "3px",
    backgroundColor: colors.white,
  },
});

const store = Store.store;

class Link extends Component {
  render() {
    const {
      classes,
      text,
      to,
      disabled,
      tag,
      redirectedTo,
      screenType,
      selected,
    } = this.props;

    if (screenType === "MOBILE") {
      return (
        <div
          className={classes.root}
          onClick={() => {
            if (redirectedTo) {
              store.setStore({ redirect: redirectedTo });
            }
            this.nav(to);
          }}
        >
          <div className={disabled ? classes.disabledSpan : classes.activeSpan}>
            <Typography variant="h4" className={classes.linkText}>
              {text}
            </Typography>
          </div>
          {tag && (
            <div
              className={
                disabled ? classes.disabledTagMobile : classes.activeTagMobile
              }
            >
              <Typography variant="h6" className={classes.tagText}>
                {tag}
              </Typography>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          className={classes.root}
          onClick={() => {
            if (redirectedTo) {
              store.setStore({ redirect: redirectedTo });
            }
            if (!disabled) {
              this.nav(to);
            }
          }}
        >
          {tag && (
            <div className={disabled ? classes.disabledTag : classes.activeTag}>
              <Typography variant="h6" className={classes.tagText}>
                {tag}
              </Typography>
            </div>
          )}
          <div className={disabled ? classes.disabledSpan : classes.activeSpan}>
            <Typography variant="h4" className={classes.linkText}>
              {text}
              {selected && <div className={classes.linkTextSelectedMark} />}
            </Typography>
          </div>
        </div>
      );
    }
  }

  nav = (screen) => {
    const { externalLink } = this.props;
    if (externalLink) {
      window.open(screen);
    } else {
      this.props.history.push(screen);
    }
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(Link)));
