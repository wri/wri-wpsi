import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  item: {
    lineHeight: "22px",
    marginBottom: "0.15rem",
    paddingTop: 0,
  },
});

export const DataStorySideNav = ({ title, children, indent }) => {
  const classes = useStyles();
  return (
    <>
      {title && <h4>{title}</h4>}
      <ul className={clsx("list-unstyled", indent && "ml-3")}>
        {React.Children.map(children, (child, idx) => {
          return (
            <li className={clsx("font-family-heading", classes.item)} key={idx}>
              {child}
            </li>
          );
        })}
      </ul>
    </>
  );
};

DataStorySideNav.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array.isRequired,
  indent: PropTypes.bool,
};
