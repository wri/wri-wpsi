import clsx from "clsx";
import React from "react";
import { useParams } from "react-router-dom";
import { DataStoryChapter } from "./Chapter";
import { DataStoryRegionNotFoundPage } from "./NotFoundPage";
import { regions } from "./regions";
import { DataStorySection } from "./Section";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  image: {
    display: "block",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    width: "100%",
  },
  stuck: {
    position: "sticky",
    top: 0,
    alignSelf: "flex-start",
  },
  graph: {
    objectFit: "cover",
    width: "100%",
    height: "auto",
    display: "block",
  },
  article: {
    //borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    //marginTop: "3rem",
    //paddingTop: "3rem",
    //background: "rgba(255, 255, 255, 0.8)",
    //zIndex: 1,
  },
  root: {
    //height: '100vh',
    //display: 'flex',
    //flexDirction: 'column'
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
});

export const DataStoryRegionPage = () => {
  const classes = useStyles();
  const { regionId } = useParams();
  const region = React.useMemo(
    () => regions.find((r) => r.id == regionId),
    [regionId]
  );
  if (!region) {
    return <DataStoryRegionNotFoundPage />;
  }

  return (
    <div className={classes.root}>
      <h1 className="mb-5">{`Causal Modal: ${region.name}`}</h1>

      <div className="row">
        <div className="col-md-3">
          <img className={classes.image} src={region.image} alt={region.name} />
        </div>
        <div className="col-md-9">
          <h5>Countries in {region.name}</h5>
          {region.countries.map((c) => c.name).join(", ")}
        </div>
      </div>

      <DataStoryChapter title="Overview" anchor="overview">
        <div className="row">
          <div className={clsx("col-md-6", classes.article)}>
            <DataStorySection title="Indirect Causal Relationships">
              {region.causalRelationship}
            </DataStorySection>
            <DataStorySection title="Mediating Effects">
              {region.mediatingEffects}
            </DataStorySection>
            <DataStorySection title="Conflict Outcome">
              {region.conflictOutcome}
            </DataStorySection>
          </div>
          <div className={clsx("col-md-6", classes.stuck)}>
            <img
              className={classes.image}
              src={region.causalGraph}
              alt={region.name}
            />
          </div>
        </div>
      </DataStoryChapter>
      <DataStoryChapter title="Data Details" anchor="details">
        {region.dataDetails.map(
          ({ dataset, sourceName, sourceUrl, level }, idx) => (
            <div className="row" key={idx}>
              <div className="col-md-6">
                {dataset} {level}
              </div>
              <div className="col-md-6">
                {sourceUrl ? <a href={sourceUrl}>{sourceName}</a> : sourceName}
              </div>
            </div>
          )
        )}
      </DataStoryChapter>
    </div>
  );
};
