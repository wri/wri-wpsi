import React from "react";
import { DataStorySection } from "./Section";
import all from "../../images/all.svg";
import relationship from "../../images/relationship.svg";
import mediating from "../../images/mediating.svg";
import { DataStoryScroller } from "./Scroller";
import { DataStoryChapter } from "./Chapter";
import { DataStoryDocumentOutline } from "./DocumentOutline";
import { DataStoryGalleryImage } from "./GalleryImage";
import { DataStoryGallery } from "./Gallery";
import { regions } from "./regions";

export const DataStoryMainPage = () => {
  return (
    <DataStoryDocumentOutline title="Understanding the causes of conflict">
      <DataStoryChapter title="Causal Models" anchor="intro">
        <p>
          Water insecurity is increasing worldwide, straining relations between
          people, communities and entire countries. WPS aims to prevent
          water-related conflict. To prevent conflicts, we need to better
          understand what causes those conflicts to target interventions, so WPS
          researched and created causal models to expose and quantify the
          complex connections that underpin the specific outcome of armed
          conflict.
        </p>
        <p>
          Typically, causal inference requires experimentation in a controlled
          lab-type setting, which is not possible with armed conflict. Instead,
          we turned to advanced statistical methods and subject-matter expertise
          to map the relationships between water, food, economics, governance,
          and community data to armed conflict events and fatalities to
          understand how water challenges can lead to conflict. We ran thousands
          of iterations of statistical experiments, testing the causal linkages
          against a vast variety of hypotheses based on current climate conflict
          research to establish strong linkages between our input variables and
          armed conflict.
        </p>
      </DataStoryChapter>
      <DataStoryChapter title="Causal Model 101" anchor="model101">
        <DataStorySection>
          <p>
            A causal graph is a visual representation of the results of a causal
            model. We can use it to understand the main causal drivers of
            conflict activities in our regions of interest. To do that, we first
            need to understand the basic structure of the causal graph:
          </p>
          <DataStoryScroller>
            <DataStorySection figure={relationship} height={100}>
              A are the main causal reasons for the armed conflicts and are
              placed at the very top of the graph:
            </DataStorySection>
            <DataStorySection figure={mediating} height={200}>
              B are the factors that mediate how A affects the outcome
            </DataStorySection>
            <DataStorySection figure={all} height={200}>
              C is the outcome, armed conflict.
            </DataStorySection>
            <DataStorySection figure={all} height={200}>
              The arrows represent the direction of causal relation. This shows
              that A affects B which leads to C.
            </DataStorySection>
          </DataStoryScroller>
          <p>
            Although A is the core reason for C, it is an indirect relationship.
            The presence of B is necessary intermediate step, called a mediating
            effect in order to reach the outcome . In this study the indirect
            relationship, water scarcity, causally influences the probability of
            conflict outbreak through the mediator, density of the population.
          </p>
        </DataStorySection>
        <DataStorySection>
          <p>
            We can quantify the strength of the relationships to the outcome
            using a few key statistics:
          </p>
          <dl>
            <dt> Causal Coefficient </dt>
            <dd>
              the strength of the relationship to the outcome
              <ul>
                <li>
                  A positive value means there is a parallel connection to the
                  outcome: the more of that variable, the more of the outcome is
                  expected
                </li>
                <li>
                  A negative value means there is an inverse connection to the
                  outcome: the less of that variable, the more of the outcome is
                  expected (or vice-versa)
                </li>
                <li>
                  The closer the value is to 0, the weaker the effect on the
                  outcome
                </li>
                <li>
                  Inestimable means there are too many or unknown pathways to
                  the outcome so the strength of the effect cannot be quantified
                  or the distribution of the data is not sufficient for the
                  calculation
                </li>
              </ul>
            </dd>
            <dt>Standard Error</dt>
            <dd>
              <p> how reliable the relationship is</p>
              <ul>
                <li>
                  Standard error is the standard deviation of the sampling
                  distribution. In other words, the higher the standard error,
                  the more spread there is in the results, and the less we can
                  have confidence in them
                </li>
                <li>The closer the value is to 0 the better</li>
              </ul>
            </dd>
            <dt> Statistical Significance</dt>
            <dd>
              <p> the confidence in the finding</p>
              <ul>
                <li>
                  We are only working with a sample of data. We need statistics
                  to help us understand how the sample will compare to the
                  population, or to all situations, not those just observed in
                  this work.
                </li>
                <li>
                  The statistical significance tells us if we can expect to see
                  this relationship in the population or if is due to random
                  chance alone
                </li>
                <li>
                  The higher the statistical significance, the more confidence
                  that we will observe this relationship in reality
                </li>
              </ul>
            </dd>
          </dl>
        </DataStorySection>
        <DataStorySection title="Methodology" anchor="Methodology">
          <p>
            Using data from the{" "}
            <a href="https://www.wri.org/research/leveraging-water-data-machine-learning-based-model-forecasting-violent-conflict">
              WPS Global Data Catalog
            </a>
            , a resource that tracks data on community, conflicts, economy,
            food, governance, and water, we created causal models for each World
            Bank region. It was necessary to use these large regions to ensure
            that we had enough data units to run the models. The data units were{" "}
            <em>
              the district level (administrative level 2), and monthly time
              step. The data range in resolution from near-real time to annual
              to static, from spatial grids to watersheds to national
              statistics.
            </em>
          </p>
          <p>
            We took a cross-section of data from <b>November 2021</b> to create
            the static causal models. In all, we created three analytical models
            to benchmark each other in place of running controlled experiments.
            These are described in detail in the WPS Causal Model Technical Note
            [link].
          </p>
          <p>
            We zeroed-in on data that had a strong correlation to conflict in
            our predictive modeling. While correlation does NOT equal causation,
            the absence of correlation does indicate the absence of causation.
            Therefore, data that was not found to be correlated to the conflict
            outcome was left out of the analysis.
          </p>
        </DataStorySection>
        <DataStorySection title="Assumptions and Limits">
          <dl>
            <dt> Stationary </dt>
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
            <dt>Stochastic</dt>
            <dd>
              The causal trends in the model can be analyzed statistically but
              are random, making its exact prediction impossible.
              <br />
              <em>
                Limitation: We cannot tie the causal model to a specific event,
                but rather the aggregation of many events
              </em>
            </dd>
            <dt>Hidden effects</dt>
            <dd>
              {`Armed conflict events are complex and can have causality embedded factors that are impossible to model or we don't have the dataset available to include in the model.  Therefore, some causes are hidden.`}
              <br />
              <em>Limitation: Not all causes are represented in the graph</em>
            </dd>
          </dl>
        </DataStorySection>
      </DataStoryChapter>
      <DataStoryChapter title="Causal Model by Region" anchor="region">
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
    </DataStoryDocumentOutline>
  );
};
