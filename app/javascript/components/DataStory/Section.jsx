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

export const DataStorySection = ({ children, height, title, anchor }) => {
  const classes = useStyles();
  const style = React.useMemo(
    () => (height ? { minHeight: height + "px" } : undefined),
    [height]
  );
  return (
    <div className={classes.body} style={style} id={anchor}>
      {title && <h4 className={classes.title}>{title}</h4>}
      {children}
    </div>
  );
};

DataStorySection.propTypes = {
  title: PropTypes.string,
  anchor: PropTypes.string,
  figure: PropTypes.string,
  height: PropTypes.number,
  children: PropTypes.any.isRequired,
};
