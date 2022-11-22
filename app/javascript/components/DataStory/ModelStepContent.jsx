import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import { createUseStyles } from "react-jss";

import PropTypes from "prop-types";
import { palette } from "./constants";

const stepHeightPx = 200;
const headerHeightPx = 70;
const useStyles = createUseStyles({
  conceal: {
    position: "sticky",
    top: "60px",
    zIndex: 1,
    background: "#fff",
    height: "1rem",
  },
  nodeBoxTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
  },
  nodeBox: {
    minHeight: "120px",
    minWidth: "240px",
    marginRight: "2.5rem",
    textAlign: "center",
    padding: "1rem 2rem",
    borderRadius: "10px",
    color: "#333",
    background: "#fff",
  },
  nodeArrowShaft: {
    position: "relative",
    "&:before": {
      content: '""',
      width: "30px",
      //height: "245px",
      position: "absolute",
      zIndex: 1,
      left: "111px",
      background: "#fff",
      top: "115px",
    },
  },
  nodeArrowHead: {
    position: "relative",
    "&:after": {
      content: '""',
      width: 0,
      height: 0,
      borderLeft: "30px solid transparent",
      borderRight: "30px solid transparent",
      borderTop: "30px solid #fff",
      position: "absolute",
      zIndex: 1,
      left: "96px",
      top: "-44px",
    },
  },
  nodeLead: {
    fontSize: "1.25rem",
    transition: "opacity linear 500ms",
    opacity: 0.3,
  },
  stepActive: {
    "& $nodeLead": { opacity: 1 },
  },
  stepCard: {
    alignItems: "flex-start",
    padding: "2rem",
    display: "flex",
    color: "#fff",
    height: `${stepHeightPx}px`,
    position: "sticky",
    zIndex: 1,
  },
  root: {
    marginBottom: "2rem",
    position: "relative",
    background: `linear-gradient(
      to bottom,
      white 16.6%,
      ${palette.indirect} 16.6% 33.3%,
      ${palette.mediating} 33.3% 83.4%,
      white 83.4%
    )`,
  },
  nodeA: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    top: `${stepHeightPx * 0 + headerHeightPx}px`,
    background: palette.indirect,
    marginBottom: `${stepHeightPx * 2}px`,
    "& $nodeArrowShaft:before": {
      height: "445px",
    },
  },
  nodeB: {
    top: `${stepHeightPx * 1 + headerHeightPx}px`,
    background: palette.mediating,
    marginBottom: `${stepHeightPx * 1}px`,
    "& $nodeArrowShaft:before": {
      height: "225px",
    },
  },
  nodeC: {
    top: `${stepHeightPx * 2 + headerHeightPx}px`,
    background: palette.outcome,
    marginBottom: 0,
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
});

const StepCard = ({ letter, title, label, className }) => {
  const classes = useStyles();

  const entry = useInView({ rootMargin: "0% 0% -30%" });

  return (
    <div
      className={clsx(
        classes.node,
        className,
        entry.inView && classes.stepActive,
        classes.stepCard
      )}
      ref={entry.ref}
    >
      <div
        className={clsx(
          classes.nodeBox,
          (letter == "a" || letter == "b") && classes.nodeArrowShaft,
          (letter == "b" || letter == "c") && classes.nodeArrowHead
        )}
      >
        <div className={classes.nodeBoxTitle}>{letter}</div>
        <div className={classes.nodeBoxTitle}>{title}</div>
      </div>
      <div className={classes.nodeLead}>{label}</div>
    </div>
  );
};
StepCard.propTypes = {
  letter: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  offsetPx: PropTypes.number,
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
        <StepCard
          offsetPx={stepHeightPx * 0 + headerHeightPx}
          className={classes.nodeA}
          letter="a"
          title="Indirect Relationship"
          label="The main causal reasons for the armed conflicts and are placed at the very top of the graph"
        />
        <StepCard
          arrow
          offsetPx={stepHeightPx * 1 + headerHeightPx}
          className={classes.nodeB}
          letter="b"
          title="Mediating Effects"
          label="Factors that mediate how A affects the outcome"
        />
        <StepCard
          arrow
          offsetPx={stepHeightPx * 2 + headerHeightPx}
          className={classes.nodeC}
          letter="c"
          title="Outcome"
          label="The outcome, armed conflict"
        />
      </div>

      <p>
        Although A is the core reason for C, it is an indirect relationship. The
        presence of B is necessary intermediate step, called a mediating effect
        in order to reach the outcome . In this study the indirect relationship,
        water scarcity, causally influences the probability of conflict outbreak
        through the mediator, density of the population.
      </p>
    </>
  );
};
