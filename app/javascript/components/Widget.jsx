import React from 'react'
import VegaRenderer from 'components/VegaRenderer';

const interpolateRegion = (spec, region) => {
  try {
    spec.data.forEach(dataSpec => {
      if (dataSpec.urlTemplate) {
        dataSpec.url = dataSpec.urlTemplate.replace("${region.gid_1}", region.gid_1)
      }
    })
    return spec
  } catch (error) {
    console.error('Invalid widget spec:', spec, error)
    return null
  }
}

const Widget = ({ region, widgetSpec }) => {
  const vegaSpec = interpolateRegion(widgetSpec, region)
  if (region && vegaSpec) {
    return (
      <VegaRenderer vegaSpec={vegaSpec} renderer={'svg'} />
    )
  } else {
    return null
  }
}

import PropTypes from 'prop-types'
Widget.propTypes = {
  region: PropTypes.object.isRequired,
  widgetSpec: PropTypes.object.isRequired,
}

export default Widget
