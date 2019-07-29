import React from 'react'
import { Map } from 'vizzuality-components'
import { BASEMAPS, LABELS } from 'components/constants'

class VizzMap extends React.Component {
  state = {
  }

  render() {
    const mapConfig = {
      mapOptions: {
        zoom: 5,
        center: { lat: 56, lng: -119 },
      },
      basemap: {
        url: BASEMAPS.dark.value,
        options: BASEMAPS.dark.options,
      },
      label: {
        url: LABELS.light.value,
        options: LABELS.light.options,
      },
    }

    return <Map {...mapConfig}>
      {(map) => (<div>Hello World {map ? '!' : '?'}</div>
      )}
    </Map>
  }
}

import PropTypes from 'prop-types'
VizzMap.propTypes = {
  match: PropTypes.object.isRequired,
}

export default VizzMap
