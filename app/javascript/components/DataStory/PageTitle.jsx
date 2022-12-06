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

export const DataStoryPageTitle = ({ title }) => {
  const classes = useStyles();
  const shortTitle = title.replace(" and ", " & ");
  return (
    <LayoutContainer variant="stickyTitle">
      <h1 className={classes.title}>{shortTitle}</h1>
    </LayoutContainer>
  );
};

DataStoryPageTitle.propTypes = {
  title: PropTypes.string,
};
