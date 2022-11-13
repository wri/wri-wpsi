import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  sidebar: {
    marginBottom: "2em",
  },
  sidebarItem: {},
  "@media screen and (min-width: 768px)": {
    sidebar: {
      paddingRight: "1em",
      position: "sticky",
      top: "1em",
    },
  },
  title: {
    marginBottom: "1em",
  },
});

export const DataStoryDocumentOutline = ({ children, title }) => {
  const classes = useStyles();
  const titles = React.useMemo(() => {
    const ret = [];
    React.Children.forEach(children, (child) => {
      ret.push([child.props.title, child.props.anchor]);
    });
    return ret;
  }, [children]);

  return (
    <>
      <h1 className={classes.title}>{title}</h1>
      <div className="row">
        <div className="col-md-3">
          <div className={classes.sidebar}>
            <h4>Jump to</h4>
            <ul className="list-unstyled">
              {titles.map(([title, anchor]) => (
                <li className={classes.sidebarItem} key={anchor}>
                  <a href={`#${anchor}`}>{title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-9">{children}</div>
      </div>
    </>
  );
};

DataStoryDocumentOutline.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
};
