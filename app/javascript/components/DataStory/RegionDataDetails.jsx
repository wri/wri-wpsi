import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";
import { palette } from "./constants";

const useStyles = createUseStyles({
  item: {
    marginBottom: "1em",
    paddingTop: 0,
  },
  title: {
    padding: '0.5rem 0',
    borderTop: '4px solid',
    borderBottom: '4px solid',
  },
  indirect: {
    borderColor: palette.indirect,
  },
  mediating: {
    borderColor: palette.mediating,
  },
  outcome: {
    borderColor: palette.outcome,
  },
});

const levelName = (value) => {
  switch (value) {
    case "Indirect":
      return "Indirect Causal Relationships";
    case "Mediator":
      return "Mediating Effects";
    case "Outcome":
      return "Conflict Outcome";
  }
  return value;
};

export const DataStoryRegionDataDetails = ({ region }) => {
  const classes = useStyles();
  return (
    <ul className="list-unstyled">
      {region.dataDetails.map(
        ({ dataset, sourceName, sourceUrl, level }, idx) => (
          <li className={classes.item} key={idx}>
            <small>{levelName(level)}</small>
            <div>{dataset}</div>
            <div>
              {sourceUrl ? <a href={sourceUrl}>{sourceName}</a> : sourceName}
            </div>
          </li>
        )
      )}
    </ul>
  );
};

DataStoryRegionDataDetails.propTypes = {
  region: PropTypes.object.isRequired,
};
