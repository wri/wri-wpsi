import React from 'react'
import { Map } from 'vizzuality-components'
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager';
import { BASEMAPS, LABELS } from 'components/constants'

class VizzMap extends React.Component {
  state = {
    layers: [],
  }

  componentDidMount() {
    const { layerId, datasetId } = this.props.params

    if (layerId) {
      const layerUrl = `https://api.resourcewatch.org/v1/layer/${layerId}`
      fetch(layerUrl)
        .then(response => response.json())
        .then(response => {
          const layers = [response.data].map((layer) => ({
            id: layer.id,
            type: layer.type,
            ...layer.attributes,
          }))

          this.setState({layers: layers})
        })
    } else if (datasetId) {
      const datasetUrl = `https://api.resourcewatch.org/v1/dataset/${datasetId}/layer`
      fetch(datasetUrl)
        .then(response => response.json())
        .then(response => {
          const layers = response.data.map((layer) => ({
            id: layer.id,
            type: layer.type,
            ...layer.attributes,
          }))

          this.setState({layers: layers})
        })
    }
  }

  render() {
    const mapConfig = {
      mapOptions: {
        zoom: 3,
        center: { lat: 0, lng: 40 },
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
      {(map) => (
        <LayerManager
          map={map}
          plugin={PluginLeaflet}
          onReady={() => {/* Layer preprocessing? */}}
        >
          {this.state.layers.map((l, i) => (
            <Layer
              {...l}
              key={l.id}
              opacity={l.opacity || 1}
              zIndex={1000 - i}
            />
          ))}
        </LayerManager>
      )}
    </Map>
  }
}

import PropTypes from 'prop-types'
VizzMap.propTypes = {
  params: PropTypes.object.isRequired,
}

export default VizzMap
