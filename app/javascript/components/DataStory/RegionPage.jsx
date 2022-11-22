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
import { palette } from "./constants";
import { useWindowSize } from "util/useWindowSize";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  image: {
    display: "block",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    width: "100%",
  },
  graphBox: {},
  article: {},
  graph: {
    width: "100%",
  },
  "@media (min-width: 992px)": {
    graphBox: {
      position: "sticky",
      top: "50px",
      alignSelf: "flex-start",
      paddingTop: "4rem",
    },
    article: {
      paddingRight: "2rem",
    },
    graph: {
      height: "calc(100vh - 145px)",
    },
  },
  main: {
    marginTop: "4em",
  },
  loading: {
    height: "700px",
  },
  title: {
    color: "#212529",
    padding: "0.5rem 0",
    borderBottom: "4px solid",
  },
  indirect: {
    borderColor: palette.indirect,
    color: palette.indirect,
  },
  mediating: {
    borderColor: palette.mediating,
    color: palette.mediating,
  },
  outcome: {
    borderColor: palette.outcome,
    color: palette.outcome,
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

  const [, width] = useWindowSize();

  if (fade) {
    return <div className={classes.loading} />;
  }

  const mainContent = (
    <DataStoryChapter
      title="Overview"
      anchor="overview"
      className={classes.article}
    >
      <DataStorySection
        title="Indirect Causal Relationships"
        titleProps={{
          className: clsx(classes.title, classes.indirect),
        }}
      >
        {region.causalRelationship}
      </DataStorySection>
      <DataStorySection
        title="Mediating Effects"
        titleProps={{
          className: clsx(classes.title, classes.mediating),
        }}
      >
        {region.mediatingEffects}
      </DataStorySection>
      <DataStorySection
        title="Conflict Outcome"
        titleProps={{ className: clsx(classes.title, classes.outcome) }}
      >
        {region.conflictOutcome}
      </DataStorySection>
    </DataStoryChapter>
  );
  const graphContent = (
    <img
      className={classes.graph}
      src={region.causalGraph}
      alt={`Causal Model for ${region.name}`}
    />
  );
  const detailsContent = (
    <>
      <DataStoryChapter title="Data Details" anchor="details">
        <DataStorySection
          title="Indirect Causal Relationships"
          titleProps={{
            className: clsx(classes.title, classes.indirect),
          }}
        >
          <DataStoryRegionDataDetails region={region} level="indirect" />
        </DataStorySection>
        <DataStorySection
          title="Mediating Effects"
          titleProps={{
            className: clsx(classes.title, classes.mediating),
          }}
        >
          <DataStoryRegionDataDetails region={region} level="mediator" />
        </DataStorySection>
        <DataStorySection
          title="Conflict Outcome"
          titleProps={{ className: clsx(classes.title, classes.outcome) }}
        >
          <DataStoryRegionDataDetails region={region} level="mediator" />
        </DataStorySection>
      </DataStoryChapter>
      <DataStoryChapter title="Causal Model 101" anchor="statsHelp">
        <DataStoryStatsHelpContent />
      </DataStoryChapter>
      <DataStorySection title="Assumptions and Limits">
        <DataStoryModelHelpContent />
      </DataStorySection>
    </>
  );

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
        {width < 992 && (
          <div className={clsx(classes.main, "row")}>
            <div className="col-lg-6">{mainContent}</div>
            <div className={clsx("col-lg-6", classes.graphBox)}>
              {graphContent}
            </div>
            <div className="col-lg-6">{detailsContent}</div>
          </div>
        )}
        {width >= 992 && (
          <div className={clsx(classes.main, "row")}>
            <div className="col-lg-6">
              {mainContent}
              {detailsContent}
            </div>
            <div className={clsx("col-lg-6", classes.graphBox)}>
              {graphContent}
            </div>
          </div>
        )}
      </LayoutContainer>
    </>
  );
};
