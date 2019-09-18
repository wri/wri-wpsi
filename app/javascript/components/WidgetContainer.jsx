import React from 'react'
import Widget from 'components/Widget'
import styleVariables from 'components/styles/variables'

const { colors } = styleVariables()
const widgetContainerStyle = {
  marginBottom: '12px',
  padding: '12px',
  backgroundColor: 'white',
  borderTop: `1px solid ${colors.gray2}`,
}

const WidgetContainer = ({ layer, region }) => {
  const [data, setData] = React.useState({gid_2: null})

  if (data.gid_2 != region.gid_2) {
    fetch(`/api/v1/widget_datapoints/${region.gid_2}/${layer.widget_fields}/`)
      .then(response => response.json())
      .then((data) => {
        setData({
          gid_2: region.gid_2,
          widgetData: data.widget_datapoints,
        })
      })

    return <div>Loading...</div>
  } else {
    return (
      <div style={widgetContainerStyle}>
        <Widget
          data={data.widgetData}
          region={region}
          fieldName={layer.widget_fields[0]}
        />
      </div>
    )
  }
}

import PropTypes from 'prop-types'
WidgetContainer.propTypes = {
  layer: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
}

export default WidgetContainer
