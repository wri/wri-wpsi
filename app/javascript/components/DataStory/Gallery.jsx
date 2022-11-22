import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    margin: '2rem 0',
  },
  "@media (min-width: 768px)": {
    root: {
      gridTemplateColumns: "repeat(4, 1fr)",
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
