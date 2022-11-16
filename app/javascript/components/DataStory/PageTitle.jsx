import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";
import { LayoutContainer } from "./LayoutContainer";

const useStyles = createUseStyles({
  title: {
    marginTop: "0.5rem",
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
      {breadcrumbs}
      <h1 className={classes.title}>{title}</h1>
    </LayoutContainer>
  );
};

DataStoryPageTitle.propTypes = {
  title: PropTypes.string,
  breadcrumbs: PropTypes.element,
};
