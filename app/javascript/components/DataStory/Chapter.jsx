import React from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  body: {
    fontSize: "1rem",
  },
  title: {
    marginBottom: "1rem",
  },
  root: {
    scrollMarginTop: "100px", //fixed header anchor scroll
    marginBottom: "3rem",
  },
});

export const DataStoryChapter = ({ children, title, anchor, className }) => {
  const classes = useStyles();
  return (
    <article id={anchor} className={clsx(classes.root, className)}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.body}>{children}</div>
    </article>
  );
};

import PropTypes from "prop-types";
DataStoryChapter.propTypes = {
  title: PropTypes.string.isRequired,
  figure: PropTypes.string,
  children: PropTypes.any.isRequired,
  anchor: PropTypes.string.isRequired,
  className: PropTypes.string,
};
