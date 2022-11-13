import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  body: {
    marginBottom: "2em",
    fontSize: "1.25rem",
  },
});

export const DataStorySection = ({ children, height }) => {
  const classes = useStyles();
  const style = React.useMemo(
    () => (height ? { minHeight: height + "px" } : undefined),
    [height]
  );
  return (
    <div className={classes.body} style={style}>
      {children}
    </div>
  );
};

import PropTypes from "prop-types";
DataStorySection.propTypes = {
  figure: PropTypes.string,
  height: PropTypes.number,
  children: PropTypes.any.isRequired,
};
