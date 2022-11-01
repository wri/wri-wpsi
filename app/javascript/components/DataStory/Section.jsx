import React from "react";

export const DataStorySection = ({ children }) => {
  return (
    <div className="lead pb-5 mb-1 j-section" style={{minHeight:'300px', background: '#efefef'}}>
      {children}
    </div>
  );
};

import PropTypes from "prop-types";
DataStorySection.propTypes = {
  figure: PropTypes.string,
  children: PropTypes.any.isRequired,
};
