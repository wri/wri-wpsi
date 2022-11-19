import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";
import { Scrollama, Step } from "react-scrollama";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  graph: {},
  stepCard: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    alignItems: "flex-start",
    padding: "2rem 2rem 4rem",
    display: "flex",
    color: "#fff",
    transition: "opacity linear 500ms",
    height: "320px",
    position: "sticky",
    zIndex: 1,
    marginBottom: "-2rem",
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
  nodeLead: {
    fontSize: "1.25rem",
    transition: "opacity linear 500ms",
    opacity: 0.0,
  },
  stepActive: {
    "& $nodeLead": { opacity: 1 },
  },
  step: {
    fontSize: "1.25em",
    marginBottom: "2rem",
  },
  locked: {
    "& $stepCard": {
      position: "relative",
      overflow: "hidden",
    },
    "& $nodeA": {
      top: "200px",
    },
    "& $nodeB": {
      top: "100px",
    },
    "& $nodeC": {
      top: "0px",
    },
  },
  scrolly: {
    marginTop: "2rem",
    marginBottom: "4rem",
    "&$locked": {
      position: "relative",
    },
  },
  nodeA: {
    top: "70px",
    background: "#28293e",
  },
  nodeB: {
    top: "255px",
    background: "#486e81",
  },
  nodeC: {
    top: "440px",
    background: "#73b85f",
    // last node
    height: "auto",
    marginBottom: "0",
    paddingBottom: "2rem",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
});

const StepCardRaw = ({ letter, title, label, className }, ref) => {
  const classes = useStyles();
  return (
    <div className={clsx(className, classes.stepCard)} ref={ref}>
      <div className={classes.nodeBox}>
        <div className={classes.nodeBoxTitle}>{letter}</div>
        <div className={classes.nodeBoxTitle}>{title}</div>
      </div>
      <div className={classes.nodeLead}>{label}</div>
    </div>
  );
};
StepCardRaw.propTypes = {
  letter: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};
const StepCard = React.forwardRef(StepCardRaw);

export const DataStoryModelStepContent = () => {
  const classes = useStyles();
  const [steps, setSteps] = React.useState({
    a: false,
    b: false,
    c: false,
  });

  //const onStepProgress = React.useCallback(({ data, progress }) => {
  //  if (data =='c') console.info("progress", data, progress);
  //}, []);

  const onStepEnter = React.useCallback(({ data }) => {
    // console.info("enter", data);
    setSteps((c) => ({ ...c, [data]: true }));
  }, []);
  const onStepExit = React.useCallback(({ data }) => {
    // console.info("exit", data);
    setSteps((c) => ({ ...c, [data]: false }));
  }, []);
  console.info(steps);

  return (
    <>
      <p>
        A causal graph is a visual representation of the results of a causal
        model. We can use it to understand the main causal drivers of conflict
        activities in our regions of interest. To do that, we first need to
        understand the basic structure of the causal graph:
      </p>

      <div className={clsx(classes.scrolly, steps.c && classes.locked)}>
        <Scrollama
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          offset={0.5}
        >
          <Step data="a">
            <StepCard
              className={clsx(
                classes.node,
                classes.nodeA,
                steps.a && classes.stepActive
              )}
              letter="A"
              title="Indirect Relationship"
              label="The main causal reasons for the armed conflicts and are placed at the very top of the graph"
            />
          </Step>
          <Step data="b">
            <StepCard
              className={clsx(
                classes.node,
                classes.nodeB,
                steps.b && classes.stepActive
              )}
              letter="B"
              title="Mediating Effects"
              label="Factors that mediate how A affects the outcome"
            />
          </Step>
          <Step data="c">
            <StepCard
              className={clsx(
                classes.node,
                classes.nodeC,
                steps.c && classes.stepActive
              )}
              letter="C"
              title="Outcome"
              label="The outcome, armed conflict"
            />
          </Step>
        </Scrollama>
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
