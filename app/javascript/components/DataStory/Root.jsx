import React from "react";
import { DataStorySection } from "./Section";
import all from "../../images/all.svg";
import relationship from "../../images/relationship.svg";
import mediating from "../../images/mediating.svg";
import { DataStoryScroller } from "./Scroller";
import { DataStoryChapter } from "./Chapter";

export const DataStoryRoot = () => {
  return (
    <>
      <DataStoryChapter title="Introduction">
        Explore the links between water and conflict in Sub-Saharan Africa using
        a causal model
      </DataStoryChapter>
      <DataStoryChapter title="Problem Statement">
        Water insecurity is increasing worldwide, straining relations between
        people, communities and entire countries. WPS aims to prevent and reduce
        water-related conflict. But to do that, we need to better understand the
        root causes of conflict…
      </DataStoryChapter>
      <DataStoryChapter title="What is a causal model?">
        A causal graph is a visual representation of the results of our a causal
        model. We can use it to understand the main causal drivers of conflict
        activities in our regions of interest. To do that, we first need to
        understand the basic structure of the causal graph:
      </DataStoryChapter>
      <DataStoryScroller>
        <DataStorySection figure={relationship} height={100}>
          A is the main causal reason for the armed conflicts and are placed at
          the very top of the graph
        </DataStorySection>
        <DataStorySection figure={mediating} height={200}>
          B are the factors that mediate how A affects the outcome
        </DataStorySection>
        <DataStorySection figure={all} height={200}>
          C is the outcome, armed conflict
        </DataStorySection>
      </DataStoryScroller>
    </>
  );
};
