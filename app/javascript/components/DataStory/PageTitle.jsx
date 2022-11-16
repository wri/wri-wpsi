import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";
import { LayoutContainer } from "./LayoutContainer";

const useStyles = createUseStyles({
  title: {
    fontSize: "1.25rem",
  },
  "@media (min-width: 768px)": {
    title: {
      fontSize: "2rem",
    },
  },
});

export const DataStoryPageTitle = ({ title, breadcrumbs }) => {
  const classes = useStyles();
  return (
    <LayoutContainer variant="stickyTitle">
      <div className="mt-2">
        {breadcrumbs}
        <h1 className={classes.title}>{title}</h1>
      </div>
    </LayoutContainer>
  );
};

DataStoryPageTitle.propTypes = {
  title: PropTypes.string,
  breadcrumbs: PropTypes.element,
};
