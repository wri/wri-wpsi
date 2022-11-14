import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    gridColumnEnd: "span 1",
    gridRowEnd: "span 1",
    borderRadius: "4px",
  },
  inner: {
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "auto",
    display: "block",
    transition: "all 300ms ease",
    opacity: 1,
    "&:hover": {
      opacity: 0.5,
    },
  },
  body: {
    pointerEvents: "none",
    position: "absolute",
    zIndex: 99,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    padding: "12px 20px",
    minHeight: "76px",
  },
  title: {
    color: "#fff",
  },
});

export const DataStoryGalleryImage = ({ title, image, path }) => {
  const classes = useStyles();
  return (
    <li className={classes.root + " p-0"}>
      <Link className={classes.inner} to={path}>
        {image && <img className={classes.image} src={image} alt={title} />}
        <div className={classes.body}>
          {title && <h4 className={classes.title}>{title}</h4>}
        </div>
      </Link>
    </li>
  );
};

import PropTypes from "prop-types";
DataStoryGalleryImage.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.string,
  children: PropTypes.any,
};
