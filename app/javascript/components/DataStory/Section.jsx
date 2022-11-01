import React from "react";

export const DataStorySection = ({ children, height }) => {
  return (
    <div
      className="lead pb-5 mb-3"
      style={{ minHeight: height + "px"}}
    >
      {children}
    </div>
  );
};

import PropTypes from "prop-types";
DataStorySection.propTypes = {
  figure: PropTypes.string,
  height: PropTypes.number,
  children: PropTypes.any.isRequired,
};
