import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  sidebar: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  "@media screen and (min-width: 768px)": {
    sidebar: {
      position: "sticky",
      top: "100px",
    },
  },
});

export const DataStoryDocumentOutline = ({ children,}) => {
  const classes = useStyles();
  const titles = React.useMemo(() => {
    const ret = [];
    React.Children.forEach(children, (child) => {
      ret.push([child.props.title, child.props.anchor]);
    });
    return ret;
  }, [children]);

  return (
    <div className="row">
      <div className="col-md-3">
        <div className={classes.sidebar}>
          <nav>
            <h4>Jump to</h4>
            <ul className="list-unstyled">
              {titles.map(([title, anchor]) => (
                <li className="font-family-heading pt-0 mb-1" key={anchor}>
                  <a href={`#${anchor}`}>{title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="col-md-9">{children}</div>
    </div>
  );
};

DataStoryDocumentOutline.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
