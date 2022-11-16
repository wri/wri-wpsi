import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";
import { Scrollama, Step } from "react-scrollama";

const useStyles = createUseStyles({
  graph: {
    alignSelf: "flex-start",
  },
  step: {
    fontSize: "1.25em",
    height: "120px",
    marginBottom: "2rem",
    transition: "opacity linear 500ms",
    opacity: 0.0,
  },
  stepActive: {
    opacity: 1,
  },
  scrolly: {
    position: "sticky",
    top: "70px",
    marginBottom: "120px",
    marginTop: "2rem",
  },
  node: {
    marginBottom: "30px",
    borderRadius: "6px",
    padding: "1rem",
    textAlign: "center",
    color: "#fff",
    height: "120px",
    transition: "opacity linear 500ms",
    opacity: 0.5,
  },
  nodeA: {
    background: "#28293e",
  },
  nodeB: {
    background: "#486e81",
  },
  nodeC: {
    background: "#73b85f",
  },
  nodeActive: {
    opacity: 1,
  },
});

export const DataStoryModelStepContent = () => {
  const classes = useStyles();
  const [step, setStep] = React.useState("a");

  const onStepEnter = React.useCallback(({ data }) => {
    setStep(data);
  }, []);

  return (
    <>
      <p>
        A causal graph is a visual representation of the results of a causal
        model. We can use it to understand the main causal drivers of conflict
        activities in our regions of interest. To do that, we first need to
        understand the basic structure of the causal graph:
      </p>

      <div className={classes.scrolly}>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className={classes.graph}>
              <div
                className={clsx(
                  classes.node,
                  classes.nodeA,
                  step.match("a") && classes.nodeActive
                )}
              >
                A
                <br />
                Indirect Relationship
                <br />
                <small>(main reason for conflict)</small>
              </div>
              <div
                className={clsx(
                  classes.node,
                  classes.nodeB,
                  step.match("b") && classes.nodeActive
                )}
              >
                B
                <br />
                Mediating Effects
                <br />
                <small>armed conflict</small>
              </div>
              <div
                className={clsx(
                  classes.node,
                  classes.nodeC,
                  step.match("c") && classes.nodeActive
                )}
              >
                C
                <br />
                Outcome
                <br />
                <small>armed conflict</small>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-8">
            <Scrollama onStepEnter={onStepEnter}>
              <Step data="a">
                <div
                  className={clsx(
                    classes.step,
                    step == "a" && classes.nodeActive
                  )}
                >
                  A are the main causal reasons for the armed conflicts and are
                  placed at the very top of the graph:
                </div>
              </Step>
              <Step data="ab">
                <div
                  className={clsx(
                    classes.step,
                    step == "ab" && classes.nodeActive
                  )}
                >
                  B are the factors that mediate how A affects the outcome
                </div>
              </Step>
              <Step data="abc">
                <div
                  className={clsx(
                    classes.step,
                    step == "abc" && classes.nodeActive
                  )}
                >
                  C is the outcome, armed conflict.
                </div>
              </Step>
            </Scrollama>
          </div>
        </div>
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
