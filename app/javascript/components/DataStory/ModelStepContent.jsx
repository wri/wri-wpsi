import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";
import { Scrollama, Step } from "react-scrollama";
import PropTypes from "prop-types";
import { palette } from "./constants";
import arrowSouth from "images/arrow_south.svg";

const stepHeightPx = 200;
const stepStretchPx = 200;
const headerHeightPx = 70;
const useStyles = createUseStyles({
  stepCard: {
    //borderTopLeftRadius: "10px",
    //borderTopRightRadius: "10px",
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
  },
  foo: {
    "&:after": {
      content: `url(${arrowSouth})`,
      position: "absolute",
      zIndex: 999999,
      left: "100px",
      bottom: "-80px",
    },
  },
  nodeLead: {
    fontSize: "1.25rem",
    transition: "opacity linear 500ms",
    opacity: 0.0,
  },
  stepActive: {
    "& $nodeLead": { opacity: 1 },
  },
  step: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
  },
  locked: {
    "& $stepCard": {
      marginBottom: 0,
      top: `${(stepHeightPx * 2) }px`,
      position: "relative",
      overflow: "hidden",
    },
    //"& $nodeA": {
    //  top: `${stepHeightPx * 1}px`,
    //},
    //"& $nodeB": {
    //  top: `${0}px`,
    //},
    //"& $nodeC": {
    //  top: `${0}px`,
    //},
  },
  root: {
    background: 'red',
    marginTop: "2rem",
    marginBottom: "4rem",
    height: `${stepHeightPx * 2 * 3}px`,
    "&$locked": {
      position: "relative",
    },
  },
  nodeA: {
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
    marginBottom: "0",
    // last node
    //height: "auto",
    //paddingBottom: "2rem",
    //borderBottomLeftRadius: "10px",
    //borderBottomRightRadius: "10px",
  },
});

const StepCard = ({
  letter,
  title,
  label,
  className,
  arrow,
  offsetPx,
  onStepEnter,
  onStepExit,
}) => {
  const classes = useStyles();
  return (
    <Scrollama
      onStepEnter={onStepEnter}
      onStepExit={onStepExit}
      offset={`${offsetPx + 10}px`}
    >
      <Step data={letter}>
        <div className={clsx(className, classes.stepCard)}>
          <div className={clsx(classes.nodeBox, arrow && classes.nodeArrow)}>
            <div className={classes.nodeBoxTitle}>{letter}</div>
            <div className={classes.nodeBoxTitle}>{offsetPx || title}</div>
          </div>
          <div className={classes.nodeLead}>{label}</div>
        </div>
      </Step>
    </Scrollama>
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

/*
const txState = (state) => {
  console.info(state);
  const newState = { ...state };
  if (newState.a) newState.seenA = true;
  if (newState.b) newState.seenB = true;
  if (newState.b) newState.seenC = true;

  //if (newState.seenA && newState.seenB && newState.seenC) {
  //  newState.locked = true;
  //} else {
  //  newState.locked = false;
  //}
  if (newState.a && newState.b && newState.c) {
    newState.locked = true;
  } else {
    newState.locked = false;
  }

  return newState;
};
*/

const reducer = (state, action) => {
  const { type, data } = action;
  const newState = { ...state };

  switch (type) {
    case "enter":
      //newState[`seen${data}`] = true; // persisted
      newState[data] = true;
      break;
    case "exit":
      newState[data] = false;
      break;
    default:
      throw new Error();
  }

  if (newState.a && newState.b && newState.c && type == 'enter') {
    newState.locked = true;
    console.info('locking', newState);
  //} else { newState.locked = false;
  }
  return newState;
};
const initialState = {
  a: false,
  b: false,
  c: false,
  locked: false,
};

export const DataStoryModelStepContent = () => {
  const classes = useStyles();
  const [steps, dispatch] = React.useReducer(reducer, initialState);

  // const onStepProgress = React.useCallback(({ data, ...progress }) => {
  //   if (data =='c') console.info("progress", data, progress);
  // }, []);

  const onStepEnter = React.useCallback(({ data }) => {
    dispatch({ type: "enter", data });
  });
  const onStepExit = React.useCallback(({ data }) => {
    dispatch({ type: "exit", data });
  }, []);

  return (
    <>
      <p>
        A causal graph is a visual representation of the results of a causal
        model. We can use it to understand the main causal drivers of conflict
        activities in our regions of interest. To do that, we first need to
        understand the basic structure of the causal graph:
      </p>
      <div className={clsx(classes.root, steps.locked && classes.locked)}>
        <StepCard
          arrow
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          offsetPx={stepHeightPx * 0 + headerHeightPx}
          className={clsx(
            classes.node,
            classes.nodeA,
            steps.a && classes.stepActive,
            steps.seenA && classes.stepSeen
          )}
          letter="a"
          title="Indirect Relationship"
          label="The main causal reasons for the armed conflicts and are placed at the very top of the graph"
        />
        <StepCard
          arrow
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          offsetPx={stepHeightPx * 1 + headerHeightPx}
          className={clsx(
            classes.node,
            classes.nodeB,
            steps.b && classes.stepActive,
            steps.seenB && classes.stepSeen
          )}
          letter="b"
          title="Mediating Effects"
          label="Factors that mediate how A affects the outcome"
        />
        <StepCard
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          offsetPx={stepHeightPx * 2 + headerHeightPx}
          className={clsx(
            classes.node,
            classes.nodeC,
            steps.c && classes.stepActive,
            steps.seenC && classes.stepSeen
          )}
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
