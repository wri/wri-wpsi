import React from "react";
import { DataStorySection } from "./Section";
import all from "../../images/all.svg";
import relationship from "../../images/relationship.svg";
import mediating from "../../images/mediating.svg";
import { DataStoryScroller } from "./Scroller";

export const DataStoryRoot = () => {
  return (
    <DataStoryScroller>
      <DataStorySection figure={relationship}>
        A is the main causal reason for the armed conflicts and are placed at
        the very top of the graph
      </DataStorySection>
      <DataStorySection figure={mediating}>
        B are the factors that mediate how A affects the outcome
      </DataStorySection>
      <DataStorySection figure={all}>
        C is the outcome, armed conflict
      </DataStorySection>
    </DataStoryScroller>
  );
};
