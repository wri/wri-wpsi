import React, { useCallback, useMemo, useState } from "react";
import { Scrollama, Step } from "react-scrollama";

export const DataStoryScroller = ({ children }) => {
  const figures = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (child && React.isValidElement(child)) {
          return child.props.figure;
        }
      }),
    [children]
  );

  const [activeFigure, setActiveFigure] = useState(0);
  const onStepEnter = useCallback(({ data }) => {
    setActiveFigure(data);
  }, []);

  const figure = figures[activeFigure]
    ? figures[activeFigure]
    : figures[figures.length - 1];

  return (
    <div className="row">
      <div className="col-4">
        <div style={{ position: "sticky", top: 0 }}>
          {figure && <img src={figure} />}
        </div>
      </div>
      <div className="col-8">
        <Scrollama onStepEnter={onStepEnter}>
          {React.Children.map(children, (child, idx) => {
            return (
              <Step data={idx} key={idx}>
                <div>{child}</div>
              </Step>
            );
          })}
        </Scrollama>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";
DataStoryScroller.propTypes = {
  children: PropTypes.array.isRequired,
};
