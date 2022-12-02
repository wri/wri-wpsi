import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  inset: {
    background: "#efefef",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  stickyTitle: {
    background: "#fff",
    position: "sticky",
    top: 0,
    alignSelf: "flex-start",
    zIndex: 999,
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px',
  },
  default: {
    background: "#fff",
  },
});

export const LayoutContainer = ({ children, className, variant }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes[variant] || classes.default, className)}>
      <div className="container">{children}</div>
    </div>
  );
};

import PropTypes from "prop-types";
LayoutContainer.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
};
