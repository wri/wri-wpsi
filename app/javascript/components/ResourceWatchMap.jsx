import React from 'react'
import _ from 'lodash'
import LayerGroupsMap from 'components/LayerGroupsMap'
import ResourceWatchLegend from 'components/ResourceWatchLegend'

class ResourceWatchMap extends React.Component {
  state = {
    layerGroups: {},
  }

  handleLayerGroupUpdate = (updatedLayerGroups) => {
    this.setState({layerGroups: updatedLayerGroups})
  }

  handleRemoveLayer = (layer) => {
    const { toggleLayer } = this.props

    toggleLayer && toggleLayer({
      layer: { id: layer.id },
      toggle: false,
    })
  }

  reformatLayer = (layer) => {
    return {
      id: layer.id,
      type: layer.type,
      ...layer.attributes,
    }
  }

  fetchLayer = (layerId) => {
    const layerUrl = `https://api.resourcewatch.org/v1/layer/${layerId}`

    fetch(layerUrl)
      .then(response => response.json())
      .then(response => {
        const layer = this.reformatLayer(response.data)
        const datasetId = layer.dataset

        if (this.state.layerGroups[datasetId]) {
          // This dataset has already been added, just add the layer
          let layerGroups = this.state.layerGroups
          layerGroups[datasetId].layers.push(layer)
          this.handleLayerGroupUpdate(layerGroups)
        } else {
          // Need to add a layer group for the dataset
          layer.active = true

          let newLayerGroup = {}
          newLayerGroup[datasetId] = {
            dataset: datasetId,
            visibility: true,
            layers: [layer],
          }

          this.handleLayerGroupUpdate({...this.state.layerGroups, ...newLayerGroup})
        }
      })
  }

  fetchDataset = (datasetId) => {
    const datasetUrl = `https://api.resourcewatch.org/v1/dataset/${datasetId}/layer`

    fetch(datasetUrl)
      .then(response => response.json())
      .then(response => {
        const layers = response.data.map(this.reformatLayer)

        if (layers.length == 0) {
          console.error(`Dataset ${datasetId} has no layers!`)
          return
        }

        layers[0].active = true

        let newLayerGroup = {}
        newLayerGroup[datasetId] = {
          dataset: datasetId,
          visibility: true,
          layers: layers,
        }

        this.handleLayerGroupUpdate({...this.state.layerGroups, ...newLayerGroup})
    })
  }

  filterLayerGroups = () => {
    const { layerGroups } = this.state
    const { activeLayers } = this.props
    const activeLayerIds = activeLayers.map(layer => layer.id)

    if (!activeLayers) return Object.values(layerGroups)

    let filteredLayerGroups = _.uniq(activeLayers.map(layer => layerGroups[layer.dataset]))
    filteredLayerGroups = filteredLayerGroups.filter(lg => !!lg) // Filter out nulls

    filteredLayerGroups.forEach(layerGroup => {
      layerGroup.layers.forEach(layer => layer.active = activeLayerIds.includes(layer.id))
      if (!layerGroup.layers.some(layer => layer.active)) layerGroup.layers[0].active = true
    })

    console.log(filteredLayerGroups)

    return filteredLayerGroups
  }

  componentDidMount() {
    const { layerId, layerIds, datasetId, datasetIds } = this.props.params

    if (layerId) {
      this.fetchLayer(layerId)
    } else if (layerIds) {
      layerIds.forEach(this.fetchLayer)
    } else if (datasetId) {
      this.fetchDataset(datasetId)
    } else if (datasetIds) {
      datasetIds.forEach(this.fetchDataset)
    }
  }

  render() {
    const { style } = this.props
    const filteredLayerGroups = this.filterLayerGroups()

    const mapStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }

    const legendStyle = {
      position: 'absolute',
      bottom: 10,
      left: 10,
      width: '100%',
    }

    return (
      <div style={style}>
        <LayerGroupsMap
          style={mapStyle}
          layerGroups={filteredLayerGroups}
        />
        <ResourceWatchLegend
          style={legendStyle}
          layerGroups={filteredLayerGroups}
          onRemoveLayer={this.handleRemoveLayer}
        />
      </div>
    )
  }
}

import PropTypes from 'prop-types'
ResourceWatchMap.propTypes = {
  style: PropTypes.object,
  params: PropTypes.object.isRequired,
  activeLayers: PropTypes.array,
  toggleLayer: PropTypes.func,
}

export default ResourceWatchMap
