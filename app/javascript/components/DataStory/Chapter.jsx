import React from "react";

export const DataStoryChapter = ({ children, title }) => {
  return (
    <>
      <h2>{title}</h2>
      <div className="lead" style={{marginBottom: '5rem'}}>
        {children}
      </div>
    </>
  );
};

import PropTypes from "prop-types";
DataStoryChapter.propTypes = {
  title: PropTypes.string.isRequired,
  figure: PropTypes.string,
  children: PropTypes.any.isRequired,
};
