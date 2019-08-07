import React from 'react'
import flatten from 'lodash/flatten'
import {
  Map,
  MapPopup,
  MapControls,
  ZoomControl,
} from 'vizzuality-components'
import { LayerManager, Layer } from 'layer-manager/dist/components'
import { PluginLeaflet } from 'layer-manager'
import { BASEMAPS, LABELS } from 'components/constants'

// Components copied from Resource Watch
import LayerPopup from 'components/LayerPopup'
import SearchControl from 'components/SearchControl'

class LayerGroupsMap extends React.Component {
  render() {
    const {
      style,
      layerGroups,
      layerGroupsInteraction,
      layerGroupsInteractionSelected,
      layerGroupsInteractionLatLng,
      mapLocation,
      setMapLocation,
      setSelectedRegion,
    } = this.props

    const mapConfig = {
      mapOptions: {
        zoom: 3,
        center: { lat: 0, lng: 40 },
      },
      basemap: {
        url: BASEMAPS.light.value,
        options: BASEMAPS.light.options,
      },
      bounds: mapLocation,
      label: {
        url: LABELS.dark.value,
        options: LABELS.dark.options,
      },
      onReady: (map) => {
        this.map = map
      },
    }

    const hasInteraction = (layer) => {
      return !!layer.interactionConfig
          && !!layer.interactionConfig.output
          && !!layer.interactionConfig.output.length
    }

    const activeLayersWithInteraction = flatten(layerGroups.map(
      lg => lg.layers.filter(l => l.active === true && hasInteraction(l))
    ))

    return (
      <div style={style}>
        <Map {...mapConfig}>
          {(map) => (
            <React.Fragment>
              {/* Controls */}
              <MapControls customClass="c-map-controls">
                <ZoomControl map={map} />
                <SearchControl
                  setMapLocation={setMapLocation}
                  setSelectedRegion={setSelectedRegion}
                />
              </MapControls>

              {/* Popup */}
              <MapPopup
                map={map}
                latlng={layerGroupsInteractionLatLng}
                data={{
                  layers: activeLayersWithInteraction,
                  layersInteraction: layerGroupsInteraction,
                  layersInteractionSelected: layerGroupsInteractionSelected
                }}
                onReady={(popup) => {
                  this.popup = popup;
                }}
              >
                <LayerPopup
                  onChangeInteractiveLayer={selected =>
                    this.props.setMapLayerGroupsInteractionSelected(selected)}
                />
              </MapPopup>

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
                      // Interaction
                      {...hasInteraction(l) && {
                          interactivity:
                            l.provider === 'carto' || l.provider === 'cartodb'
                              ? l.interactionConfig.output.map(o => o.column)
                              : true,
                          events: {
                            click: (e) => {
                              if (this.props.setMapLayerGroupsInteraction) {
                                this.props.setMapLayerGroupsInteraction({
                                  ...e,
                                  ...l
                                });
                              }
                              if (this.props.setMapLayerGroupsInteractionLatLng) {
                                this.props.setMapLayerGroupsInteractionLatLng(e.latlng);
                              }
                            }
                          }
                        }
                      }
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

  // Interactions
  layerGroupsInteraction: PropTypes.object,
  layerGroupsInteractionSelected: PropTypes.string,
  layerGroupsInteractionLatLng: PropTypes.object,
  setMapLayerGroupsInteraction: PropTypes.func.isRequired,
  setMapLayerGroupsInteractionLatLng: PropTypes.func.isRequired,
  setMapLayerGroupsInteractionSelected: PropTypes.func.isRequired,
  resetMapLayerGroupsInteraction: PropTypes.func.isRequired,
  mapLocation: PropTypes.object,
  setMapLocation: PropTypes.func.isRequired,
  setSelectedRegion: PropTypes.func.isRequired,
}

export default LayerGroupsMap
