import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    position: "relative",
    gridColumnEnd: "span 1",
    gridRowEnd: "span 1",
    display: "flex",
    flexDirection: "column",
    borderRadius: "4px",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "auto",
    display: "block",
  },
  body: {
    position: "absolute",
    zIndex: 99,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(103,51, 32, 0.7)",
    padding: "12px 20px",
    minHeight: "76px",
  },
  title: {
    color: "#fff",
  },
});

export const DataStoryGalleryImage = ({ title, image }) => {
  const classes = useStyles();
  return (
    <li className={classes.root + " p-0"}>
      {image && <img className={classes.image} src={image} alt={title} />}
      <div className={classes.body}>
        {title && <h4 className={classes.title}>{title}</h4>}
      </div>
    </li>
  );
};

import PropTypes from "prop-types";
DataStoryGalleryImage.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  image: PropTypes.string,
  children: PropTypes.any,
};
