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
  }
}

const WidgetContainer = ({ layer, region, classes }) => {
  return (
    <div className={classes.widgetContainer}>
      <Widget
        region={region}
        widgetSpec={layer.widget_spec}
      />
    </div>
  )
}

import PropTypes from 'prop-types'
WidgetContainer.propTypes = {
  layer: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  classes: PropTypes.object,
}

export default injectSheet(styles)(WidgetContainer)
