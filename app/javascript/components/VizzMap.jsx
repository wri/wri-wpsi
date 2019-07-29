import React from 'react'
import { Map } from 'vizzuality-components'
import { LayerManager } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager';
import { BASEMAPS, LABELS } from 'components/constants'

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
          {/* Layers will go here */}
        </LayerManager>
      )}
    </Map>
  }
}

export default VizzMap
