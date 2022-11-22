import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { palette } from "./constants";

const stepHeightPx = 200;
const headerHeightPx = 70;
const useStyles = createUseStyles({
  nodeBoxTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
  },
  nodeBox: {
    minHeight: "120px",
    minWidth: "215px",
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
      position: "absolute",
      zIndex: 1,
      left: "94px",
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
      left: "79px",
      top: "-47px",
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
      height: "245px",
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
        <div className={classes.nodeBoxTitle}>{letter.toUpperCase()}</div>
        <div className={classes.nodeBoxTitle}>{title}</div>
      </div>
      <div className={classes.nodeLead}>{label}</div>
      {chatter}
    </div>
  );
};
DataStoryModelStepCard.propTypes = {
  letter: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  chatter: PropTypes.any,
};
