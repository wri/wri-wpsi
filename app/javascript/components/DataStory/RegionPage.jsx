import clsx from "clsx";
import React from "react";
import { useParams } from "react-router-dom";
import { scrollToTop } from "util/scrollToTop";
import { DataStoryChapter } from "./Chapter";
import { LayoutContainer } from "./LayoutContainer";
import { DataStoryModelHelpContent } from "./ModelHelpContent";
import { DataStoryRegionNotFoundPage } from "./NotFoundPage";
import { DataStoryPageTitle } from "./PageTitle";
import { DataStoryRegionDataDetails } from "./RegionDataDetails";
import { regions } from "./regions";
import { DataStorySection } from "./Section";
import { DataStoryStatsHelpContent } from "./StatsHelpContent";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  image: {
    display: "block",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    width: "100%",
  },
  graphBox: {
    position: "sticky",
    top: "50px",
    alignSelf: "flex-start",
    paddingTop: "3.75rem",
  },
  graph: {
    height: "calc(100vh - 145px)",
    width: "100%",
  },
  main: {
    marginTop: "4em",
    marginBottom: "4em",
  },
  loading: {
    height: "700px",
  },
});

export const DataStoryRegionPage = () => {
  const { regionId } = useParams();
  const region = React.useMemo(
    () => regions.find((r) => r.id == regionId),
    [regionId]
  );
  if (!region) {
    return <DataStoryRegionNotFoundPage />;
  }
  const classes = useStyles({ image: region.causalGraph });

  const [fade, setFade] = React.useState(true);
  React.useEffect(scrollToTop, [regionId]);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setFade(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [regionId]);

  if (fade) {
    return <div className={classes.loading} />;
  }

  return (
    <>
      <DataStoryPageTitle
        title={`Causal Modal: ${region.name}`}
        breadcrumbs={
          <div className="c-breadcrumbs">
            <a className="c-breadcrumbs__link" href="/causal">
              <span>Causal Model</span>
            </a>
            <div className="c-breadcrumbs__divider">&gt;</div>
            <span className="c-breadcrumbs__item">{region.name}</span>
          </div>
        }
      />
      <LayoutContainer variant="inset">
        <div className="row">
          <div className="col-md-3">
            <img
              className={classes.image}
              src={region.image}
              alt={region.name}
            />
          </div>
          <div className="col-md-9">
            <h5>Countries in {region.name}</h5>
            {region.countries.map((c) => c.name).join(", ")}
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer>
        <div className={clsx(classes.main, "row")}>
          <div className={clsx("col-md-6", classes.article)}>
            <DataStoryChapter title="Overview" anchor="overview">
              <DataStorySection title="Indirect Causal Relationships">
                {region.causalRelationship}
              </DataStorySection>
              <DataStorySection title="Mediating Effects">
                {region.mediatingEffects}
              </DataStorySection>
              <DataStorySection title="Conflict Outcome">
                {region.conflictOutcome}
              </DataStorySection>
            </DataStoryChapter>
            <DataStoryChapter title="Data Details" anchor="details">
              <DataStoryRegionDataDetails region={region} />
            </DataStoryChapter>
            <DataStoryChapter title="Causal Model 101" anchor="statsHelp">
              <DataStoryStatsHelpContent />
            </DataStoryChapter>
            <DataStorySection title="Assumptions and Limits">
              <DataStoryModelHelpContent />
            </DataStorySection>
          </div>
          <div className={clsx("col-md-6", classes.graphBox)}>
            <DataStorySection title={`Causal Model for ${region.name}`}>
              <img
                className={classes.graph}
                src={region.causalGraph}
                alt={region.name}
              />
            </DataStorySection>
          </div>
        </div>
      </LayoutContainer>
    </>
  );
};
