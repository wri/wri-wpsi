import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
});

export const DataStoryGallery = ({ children }) => {
  const classes = useStyles();
  return <ul className={classes.root + ' list-unstyled'}>{children}</ul>;
};

DataStoryGallery.propTypes = {
  children: PropTypes.any.isRequired,
};
