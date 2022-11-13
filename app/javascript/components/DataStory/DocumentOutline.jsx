import React from "react";
import injectSheet from "react-jss";
import clsx from "clsx";
import PropTypes from "prop-types";

const styles = {
  sidebar: {
    color: "red",
  },
};

export const DataStoryDocumentOutline = injectSheet(styles)(({ children, classes }) => {
  const titles = React.useMemo(() => {
    return React.Children.map(children, (child) => child.props.title);
  }, [children]);

  return (
    <div className="row">
      <div className={clsx("col-md-3", classes.sidebar)}>
        {titles.map((title, idx) => (
          <div key={idx}>{title}</div>
        ))}
      </div>
      <div className="col-md-9">{children}</div>
    </div>
  );
});

DataStoryDocumentOutline.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
