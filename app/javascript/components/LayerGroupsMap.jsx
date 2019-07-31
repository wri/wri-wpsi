import React from 'react'
import flatten from 'lodash/flatten'
import {
  Map,
  // MapPopup,
  MapControls,
  ZoomControl,
  Legend,
  LegendListItem,
  LegendItemToolbar,
  // LegendItemButtonLayers,
  // LegendItemButtonOpacity,
  // LegendItemButtonVisibility,
  // LegendItemButtonInfo,
  LegendItemTypes,
  // LegendItemTimeStep,
  // LegendItemTimeline,
} from 'vizzuality-components'
import { LayerManager, Layer } from 'layer-manager/dist/components'
import { PluginLeaflet } from 'layer-manager'
import { BASEMAPS, LABELS } from 'components/constants'

class LayerGroupsMap extends React.Component {
  handleRemoveLayer = (layer) => {
    const { toggleMapLayerGroup } = this.props

    toggleMapLayerGroup && toggleMapLayerGroup({
      dataset: { id: layer.dataset },
      toggle: false,
    })
  }

  render() {
    const { layerGroups, bottomGutter = 0 } = this.props

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

    const mapStyle = {
      position: 'absolute',
      top: 85,
      bottom: bottomGutter,
      width: '100%',
    }

    const legendStyle = {
      position: 'absolute',
      bottom: bottomGutter + 10,
      left: 10,
      width: '100%',
    }

    return <React.Fragment>
      <div>
        <div style={mapStyle}>
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

        <div style={legendStyle}>
          <Legend
            onChangeOrder={(datasetIds) => {console.info(datasetIds)}}
            maxHeight={300}
            maxWidth={500}
          >
            {layerGroups.map((layerGroup, i) => (
              <LegendListItem
                index={i}
                key={layerGroup.dataset}
                layerGroup={layerGroup}
                toolbar={
                  <LegendItemToolbar>
                  </LegendItemToolbar>
                }
                // onChangeInfo={this.handleChangeInfo}
                // onChangeOpacity={this.handleChangeOpacity}
                // onChangeVisibility={this.handleChangeVisibility}
                // onChangeLayer={this.handleChangeLayer}
                onRemoveLayer={this.handleRemoveLayer}
              >
                <LegendItemTypes />
              </LegendListItem>
            ))}
          </Legend>
        </div>
      </div>
    </React.Fragment>
  }
}

import PropTypes from 'prop-types'
LayerGroupsMap.propTypes = {
  layerGroups: PropTypes.array.isRequired,
  bottomGutter: PropTypes.number,

  // Legend actions
  toggleMapLayerGroup: PropTypes.func,
  // setMapLayerGroupVisibility: PropTypes.func.isRequired,
  // setMapLayerGroupOpacity: PropTypes.func.isRequired,
  // setMapLayerGroupActive: PropTypes.func.isRequired,
  // setMapLayerGroupsOrder: PropTypes.func.isRequired,
}

export default LayerGroupsMap
