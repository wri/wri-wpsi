import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { palette } from "./constants";
import { breakpoints } from "./constants";

const stepHeightPx = 200;
const headerHeightPx = 70;
const useStyles = createUseStyles({
  heroLetter: {
    fontFamily: "Lato, sans-serif",
    borderRadius: "50%",
    height: "28px",
    width: "28px",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    userSelect: "none",
    fontSize: "1.05rem",
    color: "#fff",
    border: "1px solid #fff",
    "&.a": {
      background: palette.indirect,
    },
    "&.b": {
      background: palette.mediating,
    },
    "&.c": {
      background: palette.outcome,
    },
  },
  stepActive: {
    "& $nodeLead": { opacity: 1 },
  },
  nodeA: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    top: `${stepHeightPx * 0 + headerHeightPx}px`,
    background: palette.indirect,
    marginBottom: `${stepHeightPx * 2}px`,
    "& $nodeArrowShaft:before": {
      height: "480px",
    },
  },
  nodeB: {
    top: `${stepHeightPx * 1 + headerHeightPx}px`,
    background: palette.mediating,
    marginBottom: `${stepHeightPx * 1}px`,
    "& $nodeArrowShaft:before": {
      height: "281px",
    },
  },
  nodeC: {
    top: `${stepHeightPx * 2 + headerHeightPx}px`,
    background: palette.outcome,
    marginBottom: 0,
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  chatter: {
    color: "#fff",
    position: "absolute",
    width: "200px",
    top: "228px",
    left: "116px",
    transition: "opacity linear 500ms",
    opacity: 0,
  },
  chatterActive: {
    opacity: 1,
  },
  nodeBox: {
    minHeight: "80px",
    minWidth: "135px",
    marginRight: "1.5rem",
    textAlign: "center",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    color: "#333",
    background: "#fff",
  },
  nodeBoxTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.25,
  },
  nodeArrowShaft: {
    position: "relative",
    "&:before": {
      content: '""',
      width: "20px",
      position: "absolute",
      zIndex: 1,
      left: "57px",
      background: "#fff",
      top: "89px",
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
      left: "37px",
      top: "-32px",
    },
  },
  nodeLead: {
    fontSize: "1rem",
    transition: "opacity linear 500ms",
    opacity: 0.3,
  },
  stepCard: {
    alignItems: "flex-start",
    padding: "1rem",
    display: "flex",
    color: "#fff",
    height: `${stepHeightPx}px`,
    position: "sticky",
    zIndex: 1,
  },
  [`@media (min-width: ${breakpoints.sm}px)`]: {
    stepCard: {
      padding: "2rem",
    },
    nodeLead: {
      fontSize: "1.25rem",
    },
    nodeBox: {
      minHeight: "120px",
      minWidth: "215px",
      marginRight: "2.5rem",
      borderRadius: "10px",
      padding: "1rem 2rem",
    },
    nodeBoxTitle: {
      fontSize: "1.25rem",
      lineHeight: 1.7,
    },
    nodeArrowShaft: {
      position: "relative",
      "&:before": {
        width: "30px",
        left: "94px",
        top: "115px",
      },
    },
    nodeArrowHead: {
      position: "relative",
      "&:after": {
        borderLeft: "30px solid transparent",
        borderRight: "30px solid transparent",
        borderTop: "30px solid #fff",
        left: "79px",
        top: "-47px",
      },
    },
    chatter: {
      width: "300px",
      top: "308px",
      left: "204px",
    },
    nodeA: {
      "& $nodeArrowShaft:before": {
        height: "445px",
      },
    },
    nodeB: {
      "& $nodeArrowShaft:before": {
        height: "245px",
      },
    }
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
      {`The arrows represent the direction of causal relation. This shows that`}
      <br />
      <div className={clsx(classes.heroLetter, "a", "mr-2")}>A</div>
      {`affects`}
      <div className={clsx(classes.heroLetter, "b", "mx-2")}>B</div>
      {`which leads to`}
      <div className={clsx(classes.heroLetter, "c", "ml-2")}>C</div>
    </div>
  );
};

export const DataStoryModelStepCard = ({ letter, title, label, chatter }) => {
  const classes = useStyles();
  const className = classes[`node${letter.toUpperCase()}`];

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
        <div className={clsx(classes.heroLetter, letter, "mb-2")}>
          {letter.toUpperCase()}
        </div>
        <div className={classes.nodeBoxTitle}>{title}</div>
      </div>
      <div className={classes.nodeLead}>
        <div className={clsx(classes.heroLetter, letter, "mr-2")}>
          {letter.toUpperCase()}
        </div>

        {label}
      </div>
      {chatter && <ArrowChatter />}
    </div>
  );
};
DataStoryModelStepCard.propTypes = {
  letter: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  chatter: PropTypes.any,
};
