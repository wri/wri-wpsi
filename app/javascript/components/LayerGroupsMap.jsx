import React from 'react'
import flatten from 'lodash/flatten'
import {
  Map,
  // MapPopup,
  MapControls,
  ZoomControl,
} from 'vizzuality-components'
import { LayerManager, Layer } from 'layer-manager/dist/components'
import { PluginLeaflet } from 'layer-manager'
import { BASEMAPS, LABELS } from 'components/constants'

class LayerGroupsMap extends React.Component {
  render() {
    const { style, layerGroups } = this.props

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
      onReady: (map) => {
        this.map = map
      },
    }

    return (
      <div style={style}>
        <Map {...mapConfig}>
          {(map) => (
            <React.Fragment>
              <MapControls>
                <ZoomControl map={map} />
              </MapControls>

              <LayerManager
                map={map}
                plugin={PluginLeaflet}
              >
                {flatten(layerGroups.map(lg =>
                  lg.layers.filter(l => l.active === true))).map((l, i) => (
                    <Layer
                      {...l}
                      key={l.id}
                      opacity={l.opacity || 1}
                      zIndex={1000 - i}
                    />
                  ))}
              </LayerManager>
            </React.Fragment>
          )}
        </Map>
      </div>
    )
  }
}

import PropTypes from 'prop-types'
LayerGroupsMap.propTypes = {
  style: PropTypes.object,
  layerGroups: PropTypes.array.isRequired,

  // Legend actions
  // setMapLayerGroupVisibility: PropTypes.func.isRequired,
  // setMapLayerGroupOpacity: PropTypes.func.isRequired,
  // setMapLayerGroupActive: PropTypes.func.isRequired,
  // setMapLayerGroupsOrder: PropTypes.func.isRequired,
}

export default LayerGroupsMap
