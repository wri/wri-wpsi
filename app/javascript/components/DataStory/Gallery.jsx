import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";
import { breakpoints } from "./constants";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    margin: "3rem 0",
  },
  [`@media (min-width: ${breakpoints.md}px)`]: {
    root: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

export const DataStoryGallery = ({ children }) => {
  const classes = useStyles();
  return <ul className={classes.root + " list-unstyled"}>{children}</ul>;
};

DataStoryGallery.propTypes = {
  children: PropTypes.any.isRequired,
};
