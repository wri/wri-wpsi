import React from 'react'
import styleVariables from 'components/styles/variables'
import injectSheet from 'react-jss'
import Widget from 'components/Widget'

const { colors } = styleVariables()
const styles = {
  widgetContainer: {
    marginBottom: '12px',
    padding: '12px',
    backgroundColor: 'white',
    borderTop: `1px solid ${colors.gray2}`,
    display: 'flex',
    justifyContent: 'center',
  },
  noWidgetMessage: {
    fontStyle: 'italic',
    fontSize: '13px',
    lineHeight: '1.2',
    paddingBottom: '0px',
  },
}

const WidgetContainer = ({ layer, region, classes }) => {
  if (layer.widget_spec && layer.widget_spec != '') {
    return (
      <div className={classes.widgetContainer}>
        <Widget
          region={region}
          widgetSpec={layer.widget_spec}
        />
      </div>
    )
  } else {
    const classNames = [classes.widgetContainer, classes.noWidgetMessage]
    return (
      <div className={classNames.join(' ')}>
        The dataset is not used as an input to the model
        and therefore is not available at the administrative level.
      </div>
    )
  }
}

import PropTypes from 'prop-types'
WidgetContainer.propTypes = {
  layer: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  classes: PropTypes.object,
}

export default injectSheet(styles)(WidgetContainer)
