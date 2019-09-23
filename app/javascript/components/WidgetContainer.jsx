import React from 'react'
import Widget from 'components/Widget'
import styleVariables from 'components/styles/variables'

const { colors } = styleVariables()
const widgetContainerStyle = {
  marginBottom: '12px',
  padding: '12px',
  backgroundColor: 'white',
  borderTop: `1px solid ${colors.gray2}`,
  display: 'flex',
  justifyContent: 'center',
}

const WidgetContainer = ({ layer, region }) => {
  return (
    <div style={widgetContainerStyle}>
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
}

export default WidgetContainer
