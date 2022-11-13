import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  body: {
    marginBottom: "2em",
    fontSize: "1rem",
  },
  title: {
  },
});

export const DataStoryChapter = ({ children, title, anchor }) => {
  const classes = useStyles();
  return (
    <section id={anchor}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.body}>{children}</div>
    </section>
  );
};

import PropTypes from "prop-types";
DataStoryChapter.propTypes = {
  title: PropTypes.string.isRequired,
  figure: PropTypes.string,
  children: PropTypes.any.isRequired,
  anchor: PropTypes.string.isRequired,
};
