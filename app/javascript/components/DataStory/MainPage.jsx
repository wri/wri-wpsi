import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { DataStoryChapter } from "./Chapter";
import { DataStoryGallery } from "./Gallery";
import { DataStoryGalleryImage } from "./GalleryImage";
import { LayoutContainer } from "./LayoutContainer";
import { DataStoryModelStepContent } from "./ModelStepContent";
import { DataStoryPageTitle } from "./PageTitle";
import { regions } from "./regions";
import { DataStorySideNav } from "./SideNav";

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
                <a href="#methodology">Methodology</a>
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
                In order to prevent water-related conflicts, we need to better
                understand what causes those conflicts and target interventions.
                WPS has sought to create causal models to identify the causes of
                conflicts in regions throughout the world. Doing so exposes and
                quantifies the complex connections that underpin the specific
                outcome of armed conflict.
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
                variables and armed conflict. Based on this, we are able to
                identify factors that contribute to conflict and the extent that
                they do so. Below we explain how the causal model works in more
                detail, and you can select links to see the findings from
                different regions of the world.
              </p>
            </DataStoryChapter>
            <DataStoryChapter title="Causal Model 101" anchor="model101">
              <DataStoryModelStepContent />
            </DataStoryChapter>
            <DataStoryChapter title="Methodology" anchor="methodology">
              <p>
                Using data from the{" "}
                <a href="https://www.wri.org/research/leveraging-water-data-machine-learning-based-model-forecasting-violent-conflict">
                  WPS Global Data Catalog
                </a>
                , a resource that tracks data on community, conflicts, economy,
                food, governance, and water, we created causal models for each
                World Bank region. It was necessary to use these large regions
                to ensure that we had enough data units to run the models. The
                data units were the district level (administrative level 2), and
                monthly time step. The data range in resolution from near-real
                time to annual to static, from spatial grids to watersheds to
                national statistics.
              </p>
              <p>
                We took a cross-section of data from <b>November 2021</b> to
                create the static causal models. In all, we created three
                analytical models to benchmark each other in place of running
                controlled experiments. These are described in detail in the WPS
                Causal Model Technical Note [forthcoming].
              </p>
              <p>
                We zeroed-in on data that had a strong correlation to conflict
                in our predictive modeling. While correlation does not equal
                causation, the absence of correlation does indicate the absence
                of causation, helping us to rule out potential indirect factors
                and mediating effects. Therefore, data that was not found to be
                correlated to the conflict outcome was left out of the analysis.
              </p>
            </DataStoryChapter>
            <DataStoryChapter
              title="Select a Causal Model by Region"
              anchor="regions"
            >
              <p>
                You can explore the causal models for the following World Bank
                regions.
              </p>
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
