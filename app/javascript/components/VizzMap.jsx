import React from 'react'
import flatten from 'lodash/flatten';
import {
  Map,
  MapControls,
  ZoomControl,
  Legend,
  LegendListItem,
  LegendItemTypes,
  LegendItemToolbar,
} from 'vizzuality-components';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager';
import { BASEMAPS, LABELS } from 'components/constants'

class VizzMap extends React.Component {
  state = {
    layerGroups: [],
  }

  reformLayer(layer) {
    return {
      id: layer.id,
      type: layer.type,
      ...layer.attributes,
    }
  }

  fetchLayer(layerId) {
    const layerUrl = `https://api.resourcewatch.org/v1/layer/${layerId}`
    fetch(layerUrl)
      .then(response => response.json())
      .then(response => {
        const layers = [response.data].map(this.reformLayer)

        layers[0].active = true

        const newLayerGroup = {
          dataset: layers[0].dataset,
          visibility: true,
          layers: layers,
        }

        const updatedLayerGroups = this.state.layerGroups
        updatedLayerGroups.push(newLayerGroup)
        this.setState({layerGroups: updatedLayerGroups})
      })
  }

  fetchDataset(datasetId) {
    console.info(datasetId)
    const datasetUrl = `https://api.resourcewatch.org/v1/dataset/${datasetId}/layer`

    fetch(datasetUrl)
      .then(response => response.json())
      .then(response => {
        const layers = response.data.map(this.reformLayer)

        layers[0].active = true

        const newLayerGroup = {
          dataset: datasetId,
          visibility: true,
          layers: layers,
        }

        const updatedLayerGroups = this.state.layerGroups
        updatedLayerGroups.push(newLayerGroup)
        this.setState({layerGroups: updatedLayerGroups})
    })
  }

  componentDidMount() {
    const { layerId, datasetId, datasetIds } = this.props.params

    if (layerId) {
      this.fetchLayer(layerId)
    } else if (datasetId) {
      this.fetchDataset(datasetId)
    } else if (datasetIds) {
      datasetIds.forEach(this.fetchDataset.bind(this))
    }
  }

  render() {
    const { layerGroups } = this.state

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

    const legendHeight = 500

    const mapStyle = {
      position: 'absolute',
      top: 85,
      bottom: legendHeight,
      width: '100%',
    }

    const legendStyle = {
      position: 'absolute',
      bottom: legendHeight + 10,
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
                  onReady={() => {/* Layer preprocessing? */}}
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
            maxHeight={legendHeight}
            maxWidth={500}
          >
            {layerGroups.map((layerGroup, i) => (
              <LegendListItem
                index={i}
                key={layerGroup.dataset}
                layerGroup={layerGroup}
                toolbar={<LegendItemToolbar />}
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
VizzMap.propTypes = {
  params: PropTypes.object.isRequired,
}

export default VizzMap
