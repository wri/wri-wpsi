import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { DataStoryChapter } from "./Chapter";
import { DataStoryGallery } from "./Gallery";
import { DataStoryGalleryImage } from "./GalleryImage";
import { LayoutContainer } from "./LayoutContainer";
import { DataStoryModelStepContent } from "./ModelStepContent";
import { regions } from "./regions";
import { DataStorySection } from "./Section";
import { DataStorySideNav } from "./SideNav";
import { DataStoryStatsHelpContent } from "./StatsHelpContent";
import { DataStoryPageTitle } from "./PageTitle";

const useStyles = createUseStyles({
  nav: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  "@media (min-width: 768px)": {
    nav: {
      position: "sticky",
      top: "100px",
    },
  },
  main: {
    marginTop: "3rem",
  },
  "@global": {
    html: {
      scrollBehavior: "smooth",
    },
  },
});

export const DataStoryMainPage = () => {
  const classes = useStyles();
  return (
    <>
      <DataStoryPageTitle title="Understanding the causes of conflict" />
      <LayoutContainer>
        <div className={clsx("row", classes.main)}>
          <div className="col-lg-3">
            <nav className={classes.nav}>
              <DataStorySideNav title="Jump To">
                <a href="#intro">Causal Models</a>
                <a href="#model101">Causal Model 101</a>
                <div>
                  <a href="#regions">Regions</a>
                  <DataStorySideNav indent>
                    {regions.map((region) => (
                      <Link key={region.id} to={`regions/${region.id}`}>
                        {region.name}
                      </Link>
                    ))}
                  </DataStorySideNav>
                </div>
              </DataStorySideNav>
            </nav>
          </div>
          <div className="col-lg-9">
            <DataStoryChapter title="Causal Models" anchor="intro">
              <p>
                Water insecurity is increasing worldwide, straining relations
                between people, communities and entire countries. WPS aims to
                prevent water-related conflict. To prevent conflicts, we need to
                better understand what causes those conflicts to target
                interventions, so WPS researched and created causal models to
                expose and quantify the complex connections that underpin the
                specific outcome of armed conflict.
              </p>
              <p>
                Typically, causal inference requires experimentation in a
                controlled lab-type setting, which is not possible with armed
                conflict. Instead, we turned to advanced statistical methods and
                subject-matter expertise to map the relationships between water,
                food, economics, governance, and community data to armed
                conflict events and fatalities to understand how water
                challenges can lead to conflict. We ran thousands of iterations
                of statistical experiments, testing the causal linkages against
                a vast variety of hypotheses based on current climate conflict
                research to establish strong linkages between our input
                variables and armed conflict.
              </p>
            </DataStoryChapter>
            <DataStoryChapter title="Causal Model 101" anchor="model101">
              <DataStorySection>
                <DataStoryModelStepContent />
              </DataStorySection>
              <DataStorySection>
                <DataStoryStatsHelpContent />
              </DataStorySection>
              <DataStorySection title="Methodology" anchor="Methodology">
                <p>
                  Using data from the{" "}
                  <a href="https://www.wri.org/research/leveraging-water-data-machine-learning-based-model-forecasting-violent-conflict">
                    WPS Global Data Catalog
                  </a>
                  , a resource that tracks data on community, conflicts,
                  economy, food, governance, and water, we created causal models
                  for each World Bank region. It was necessary to use these
                  large regions to ensure that we had enough data units to run
                  the models. The data units were{" "}
                  <em>
                    the district level (administrative level 2), and monthly
                    time step. The data range in resolution from near-real time
                    to annual to static, from spatial grids to watersheds to
                    national statistics.
                  </em>
                </p>
                <p>
                  We took a cross-section of data from <b>November 2021</b> to
                  create the static causal models. In all, we created three
                  analytical models to benchmark each other in place of running
                  controlled experiments. These are described in detail in the
                  WPS Causal Model Technical Note [link].
                </p>
                <p>
                  We zeroed-in on data that had a strong correlation to conflict
                  in our predictive modeling. While correlation does NOT equal
                  causation, the absence of correlation does indicate the
                  absence of causation. Therefore, data that was not found to be
                  correlated to the conflict outcome was left out of the
                  analysis.
                </p>
              </DataStorySection>
              <DataStorySection title="Assumptions and Limits">
                <dl>
                  <dt className="font-family-heading"> Stationary </dt>
                  <dd>
                    {`This condition implies that, over time, the model's statistical properties do not change over time. This assumption makes the patterns in the model easier to detect, analyze and interpret. You can read more about stationarity in time series analysis `}
                    <a href="https://towardsdatascience.com/stationarity-in-time-series-analysis-90c94f27322">
                      here
                    </a>
                    .
                    <br />
                    <em>
                      Limitation: Models do not reflect temporal variation like
                      seasonality
                    </em>
                  </dd>
                  <dt className="font-family-heading">Stochastic</dt>
                  <dd>
                    The causal trends in the model can be analyzed statistically
                    but are random, making its exact prediction impossible.
                    <br />
                    <em>
                      Limitation: We cannot tie the causal model to a specific
                      event, but rather the aggregation of many events
                    </em>
                  </dd>
                  <dt className="font-family-heading">Hidden effects</dt>
                  <dd>
                    {`Armed conflict events are complex and can have causality embedded factors that are impossible to model or we don't have the dataset available to include in the model.  Therefore, some causes are hidden.`}
                    <br />
                    <em>
                      Limitation: Not all causes are represented in the graph
                    </em>
                  </dd>
                </dl>
              </DataStorySection>
            </DataStoryChapter>
            <DataStoryChapter
              title="Select a Causal Model by Region"
              anchor="regions"
            >
              <DataStoryGallery>
                {regions.map((region) => (
                  <DataStoryGalleryImage
                    image={region.image}
                    key={region.id}
                    title={region.name}
                    path={`regions/${region.id}`}
                  ></DataStoryGalleryImage>
                ))}
              </DataStoryGallery>
            </DataStoryChapter>
          </div>
        </div>
      </LayoutContainer>
    </>
  );
};
