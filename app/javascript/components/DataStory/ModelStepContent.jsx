import React from "react";
import { createUseStyles } from "react-jss";
import { palette } from "./constants";
import { DataStoryModelStepCard } from "./ModelStepCard";

const useStyles = createUseStyles({
  root: {
    marginBottom: "2rem",
    position: "relative",
    borderRadius: "10px",
    background: `linear-gradient(
      to bottom,
      ${palette.indirect} 50%,
      ${palette.mediating} 50% 83.4%,
      white 83.4%
    )`,
  },
});

export const DataStoryModelStepContent = () => {
  const classes = useStyles();

  return (
    <>
      <p>
        The causal model identifies factors that indirectly or as a mediating
        effect cause armed conflict. Indirect factors are factors that can lead
        to conflict, and mediating effects determine how much the factor
        influences the outcome. We represent these findings in a causal graph
        that we can use to understand the main causal drivers of conflict
        activities in our regions of interest. A schematic of how the causal
        graph looks is shown below:
      </p>
      <div className={classes.root}>
        <DataStoryModelStepCard
          letter="a"
          title="Indirect Relationships"
          label="are the main causal reasons for the armed conflicts and are placed at the very top of the graph"
          chatter={true}
        />
        <DataStoryModelStepCard
          arrow
          letter="b"
          title="Mediating Effects"
          label="are the factors that mediate how A affects the outcome"
        />
        <DataStoryModelStepCard
          arrow
          letter="c"
          title="Outcome"
          label="is the outcome, armed conflict"
        />
      </div>

      <p>
        From this graph we can see that although A is the core reason for C, it
        is an indirect relationship. This means that the existence of A alone
        will not cause armed conflict. Instead, the presence of B is a necessary
        intermediate step, called a mediating effect in order to reach the
        outcome.
      </p>
      <p>
        The causal graphs also show two numbers for each indirect factor and
        mediating effect. These numbers include an effect and error and
        represent how strong the causal relationship is between the variable and
        resulting conflict
      </p>
    </>
  );
};
