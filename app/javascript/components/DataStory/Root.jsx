import React from "react";
import { DataStorySection } from "./Section";
import all from "../../images/all.svg";
import relationship from "../../images/relationship.svg";
import mediating from "../../images/mediating.svg";
import { DataStoryScroller } from "./Scroller";
import { DataStoryChapter } from "./Chapter";
import { DataStoryDocumentOutline } from "./DocumentOutline";

export const DataStoryRoot = () => {
  return (
    <DataStoryDocumentOutline>
      <DataStoryChapter title="Causal Models">
        <DataStorySection>
          Water insecurity is increasing worldwide, straining relations between
          people, communities and entire countries. WPS aims to prevent
          water-related conflict. To prevent conflicts, we need to better
          understand what causes those conflicts to target interventions, so WPS
          researched and created causal models to expose and quantify the
          complex connections that underpin the specific outcome of armed
          conflict.
        </DataStorySection>
        <DataStorySection>
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
        </DataStorySection>
      </DataStoryChapter>
      <DataStoryChapter title="Causal Model 101">
        <DataStorySection>
          A causal graph is a visual representation of the results of a causal
          model. We can use it to understand the main causal drivers of conflict
          activities in our regions of interest. To do that, we first need to
          understand the basic structure of the causal graph:
        </DataStorySection>
        <DataStoryScroller>
          <DataStorySection figure={relationship} height={100}>
            A are the main causal reasons for the armed conflicts and are placed at the very top of the graph 
          </DataStorySection>
          <DataStorySection figure={mediating} height={200}>
            B are the factors that mediate how A affects the outcome
          </DataStorySection>
          <DataStorySection figure={all} height={200}>
            C is the outcome, armed conflict.
          </DataStorySection>
          <DataStorySection figure={all} height={200}>
            The arrows represent the direction of causal relation.  This shows that A affects B which leads to C.
          </DataStorySection>
        </DataStoryScroller>
        <DataStorySection>
          Although A is the core reason for C, it is an indirect relationship.
          The presence of B is necessary intermediate step, called a mediating
          effect in order to reach the outcome . In this study the indirect
          relationship, water scarcity, causally influences the probability of
          conflict outbreak through the mediator, density of the population.
        </DataStorySection>
      </DataStoryChapter>
      <DataStoryChapter title="Select a Causal Model by Region">
        A causal graph is a visual representation of the results of our a causal
        model. We can use it to understand the main causal drivers of conflict
        activities in our regions of interest. To do that, we first need to
        understand the basic structure of the causal graph:
      </DataStoryChapter>
    </DataStoryDocumentOutline>
  );
};
