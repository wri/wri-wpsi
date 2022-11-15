import PropTypes from "prop-types";
import React from "react";

/*
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  root: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  "@media screen and (min-width: 768px)": {
    root: {
      position: "sticky",
      top: "100px",
    },
  },
});
*/

export const DataStorySideNav = ({ title, children }) => {
  //const classes = useStyles();

  return (
    <>
      {title && <h4>{title}</h4>}
      <ul className="list-unstyled">
        {React.Children.map(children, (child, idx) => {
          return (
            <li className="font-family-heading pt-0 mb-1" key={idx}>
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
};
