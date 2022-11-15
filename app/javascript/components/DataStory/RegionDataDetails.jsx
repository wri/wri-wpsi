import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  row: {
    marginBottom: "2em",
  },
});

export const DataStoryRegionDataDetails = ({ region }) => {
  const classes = useStyles();
  return (
    <>
      {region.dataDetails.map(
        ({ dataset, sourceName, sourceUrl, level }, idx) => (
          <div className={clsx("row", classes.row)} key={idx}>
            <div className="col-xl-6">
              {dataset} {level}
            </div>
            <div className="col-xl-6">
              {sourceUrl ? <a href={sourceUrl}>{sourceName}</a> : sourceName}
            </div>
          </div>
        )
      )}
    </>
  );
};

DataStoryRegionDataDetails.propTypes = {
  region: PropTypes.object.isRequired,
};
