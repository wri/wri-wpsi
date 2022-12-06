import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";
import { LayoutContainer } from "./LayoutContainer";
import { breakpoints } from "./constants";

const useStyles = createUseStyles({
  title: {
    fontSize: "0.938rem",
  },
  [`@media (min-width: ${breakpoints.sm}px)`]: {
    title: {
      fontSize: "1.25rem",
    },
  },
  [`@media (min-width: ${breakpoints.lg}px)`]: {
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
