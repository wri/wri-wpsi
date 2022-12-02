import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  title: {
    color: "#212529",
  },
  body: {
    marginBottom: "3rem",
  },
});

export const DataStorySection = ({ children, title, anchor, titleProps }) => {
  const classes = useStyles();
  return (
    <div className={classes.body} id={anchor}>
      {title && (
        <h4 className={classes.title} {...titleProps}>
          {title}
        </h4>
      )}
      {children}
    </div>
  );
};

DataStorySection.propTypes = {
  title: PropTypes.string,
  anchor: PropTypes.string,
  titleProps: PropTypes.object,
  children: PropTypes.any.isRequired,
};
