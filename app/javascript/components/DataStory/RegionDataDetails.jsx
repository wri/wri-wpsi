import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  item: {
    marginBottom: "0em",
    paddingTop: 0,
    lineHeight: "24px",
  },
});


export const DataStoryRegionDataDetails = ({ region, level }) => {
  const classes = useStyles();
  const items = region.dataDetails.filter(
    (d) => d.level.toLowerCase() == level
  );
  return (
    <ul className="list-unstyled">
      {items.map(({ dataset, sourceName, sourceUrl }, idx) => (
        <li className={classes.item} key={idx}>
          <div className={classes.content}>
            <div>{dataset}</div>
            <div>
              {sourceUrl ? <a href={sourceUrl}>{sourceName}</a> : sourceName}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

DataStoryRegionDataDetails.propTypes = {
  region: PropTypes.object.isRequired,
  level: PropTypes.string.isRequired,
};
