import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";
import { useInView } from "react-intersection-observer";

import PropTypes from "prop-types";
import { palette } from "./constants";
import arrowSouth from "images/arrow_south.svg";

const stepHeightPx = 200;
const stepStretchPx = 200;
const headerHeightPx = 70;
const useStyles = createUseStyles({
  conceal: {
    position: "sticky",
    top: "60px",
    zIndex: 1,
    background: "#fff",
    height: "1rem",
  },
  stepCard: {
    bordertRadius: "10px",
    alignItems: "flex-start",
    padding: "2rem",
    display: "flex",
    color: "#fff",
    height: `${stepHeightPx}px`,
    position: "sticky",
    zIndex: 1,
    marginBottom: `${stepStretchPx}px`,
    //marginBottom: "-2rem",
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
  nodeArrow: {
    position: "relative",
    "&:after": {
      content: `url(${arrowSouth})`,
      transition: "opacity linear 500ms",
      position: "absolute",
      zIndex: 1,
      left: "100px",
      top: "-134px",
      opacity: 0,
    },
  },
  nodeLead: {
    fontSize: "1.25rem",
    transition: "opacity linear 500ms",
    opacity: 0.3,
  },
  stepActive: {
    "& $nodeLead": { opacity: 1 },
    "& $nodeArrow:after": {
      opacity: 1.0,
    },
  },
  stepStuck: {
    "&$nodeA": {
      marginBottom: `${stepStretchPx * 2}px`,
    },
  },
  locked: {
    "& $stepCard": {
      marginBottom: 0,
      top: `${stepHeightPx * 2}px`,
      position: "relative",
      overflow: "hidden",
    },
  },
  root: {
    marginTop: "2rem",
    marginBottom: "4rem",
    height: `${stepHeightPx * 2 * 3}px`,
    position: "relative",
    background: `linear-gradient(
      to bottom,
      white 16.6%,
      ${palette.indirect} 16.6% 49.8%,
      ${palette.mediating} 66.7%
    )`,
    //white 33.3% 49.9%,
    //${palette.outcome} 66.6%
  },
  nodeA: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    top: `${stepHeightPx * 0 + headerHeightPx}px`,
    background: palette.indirect,
  },
  nodeB: {
    top: `${stepHeightPx * 1 + headerHeightPx}px`,
    background: palette.mediating,
  },
  nodeC: {
    top: `${stepHeightPx * 2 + headerHeightPx}px`,
    background: palette.outcome,
    marginBottom: 0,
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
});

const StepCard = ({
  letter,
  title,
  label,
  className,
  arrow,
  offsetPx,
}) => {
  const classes = useStyles();

  ///const { ref, inView, entry } = useInView({ rootMargin: "0% 0% -30%" });
  const entry = useInView({ rootMargin: "0% 0% -30%"  });
  const sticky = useInView({ rootMargin: `0px 0px -${offsetPx}px 0px` });

  const ref = React.useCallback((node) => {
    entry.ref(node)
    sticky.ref(node)
  }, [entry.ref, sticky.ref]);

  console.info(letter, entry.inView, sticky.inView, offsetPx)

  return (
    <div
      className={clsx(
        classes.node,
        className,
        entry.inView && classes.stepActive,
        sticky.inView && classes.stepStuck,
        classes.stepCard
      )}
      ref={ref}
    >
      <div className={clsx(classes.nodeBox, arrow && classes.nodeArrow)}>
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
  arrow: PropTypes.bool,
  className: PropTypes.string,
  offsetPx: PropTypes.number,
  onStepEnter: PropTypes.any,
  onStepExit: PropTypes.any,
};

const reducer = (state, action) => {
  const { type, data } = action;
  var newState = { ...state };

  if (type == "enter") {
    newState[data] = true;
  } else if (type == "exit") {
    //newState[data] = false;
  } else {
    throw new Error();
  }
  console.info(newState);
  return newState;
};
const initialState = {
  a: false,
  b: false,
  c: false,
  root: false,
};

export const DataStoryModelStepContent = () => {
  const classes = useStyles();
  const [steps, dispatch] = React.useReducer(reducer, initialState);

  const onStepEnter = React.useCallback(({ data, direction }) => {
    dispatch({ type: "enter", data, direction });
  });
  const onStepExit = React.useCallback(({ data, direction }) => {
    dispatch({ type: "exit", data, direction });
  }, []);

  return (
    <>
      <p>
        A causal graph is a visual representation of the results of a causal
        model. We can use it to understand the main causal drivers of conflict
        activities in our regions of interest. To do that, we first need to
        understand the basic structure of the causal graph:
      </p>
      <div className={classes.conceal} />
      <div className={(classes.root, steps.locked && classes.locked)}>
        <StepCard
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          offsetPx={stepHeightPx * 0 + headerHeightPx}
          className={classes.nodeA}
          letter="a"
          title="Indirect Relationship"
          label="The main causal reasons for the armed conflicts and are placed at the very top of the graph"
        />
        <StepCard
          arrow
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          offsetPx={stepHeightPx * 1 + headerHeightPx}
          className={classes.nodeB}
          letter="b"
          title="Mediating Effects"
          label="Factors that mediate how A affects the outcome"
        />
        <StepCard
          arrow
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
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
