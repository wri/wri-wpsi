import React from 'react'
import Widget from 'components/Widget'

const WidgetContainer = ({
  layer,
  region,
}) => {
  const widgetContainerStyle = {
    marginTop: '12px',
    marginBottom: '12px',
    padding: '12px',
    backgroundColor: 'white',
  }

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
