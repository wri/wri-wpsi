import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import { createUseStyles } from "react-jss";
import { palette } from "./constants";
import { DataStoryModelStepCard } from "./ModelStepCard";

const useStyles = createUseStyles({
  conceal: {
    position: "sticky",
    top: "46px",
    zIndex: 1,
    background: "#fff",
    height: "25px",
  },
  root: {
    marginBottom: "2rem",
    position: "relative",
    background: `linear-gradient(
      to bottom,
      white 16.6%,
      ${palette.indirect} 16.6% 50%,
      ${palette.mediating} 50% 83.4%,
      white 83.4%
    )`,
  },
  chatter: {
    color: "#fff",
    position: "absolute",
    width: "280px",
    top: "308px",
    left: "204px",
    transition: "opacity linear 500ms",
    opacity: 0,
  },
  chatterActive: {
    opacity: 1,
  },
});

const ArrowChatter = () => {
  const classes = useStyles();
  const entry = useInView({ rootMargin: "0% 0% -30%" });

  return (
    <div
      className={clsx(classes.chatter, entry.inView && classes.chatterActive)}
      ref={entry.ref}
    >
      The arrows represent the direction of causal relation. This shows that A
      affects B which leads to C.
    </div>
  );
};

export const DataStoryModelStepContent = () => {
  const classes = useStyles();

  return (
    <>
      <p>
        A causal graph is a visual representation of the results of a causal
        model. We can use it to understand the main causal drivers of conflict
        activities in our regions of interest. To do that, we first need to
        understand the basic structure of the causal graph:
      </p>
      <div className={classes.conceal} />
      <div className={classes.root}>
        <DataStoryModelStepCard
          letter="a"
          title="Indirect Relationship"
          label="A are the main causal reasons for the armed conflicts and are placed at the very top of the graph"
          chatter={<ArrowChatter />}
        />
        <DataStoryModelStepCard
          arrow
          letter="b"
          title="Mediating Effects"
          label="B are the factors that mediate how A affects the outcome"
        />
        <DataStoryModelStepCard
          arrow
          letter="c"
          title="Outcome"
          label="C is the outcome, armed conflict"
        />
      </div>

      <p>
        Although A is the core reason for C, it is an indirect relationship. The
        presence of B is a necessary intermediate step, called a mediating effect
        in order to reach the outcome. In this study, the indirect relationship,
        water scarcity, causally influences the probability of conflict outbreak
        through the mediator, density of the population.
      </p>
    </>
  );
};
