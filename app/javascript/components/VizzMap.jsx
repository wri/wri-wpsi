import React from 'react'
import { Map } from 'vizzuality-components'
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager';
import { BASEMAPS, LABELS } from 'components/constants'
import { layers } from 'components/sampleLayers'

class VizzMap extends React.Component {
  render() {
    const mapConfig = {
      mapOptions: {
        zoom: 1,
        center: { lat: 0, lng: 0 },
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
          {layers.map((l, i) => (
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

export default VizzMap
