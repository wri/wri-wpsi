import React from 'react'
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
    const { toggleMapLayerGroup } = this.props

    toggleMapLayerGroup && toggleMapLayerGroup({
      dataset: { id: layer.dataset },
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
        const layers = [response.data].map(this.reformatLayer)

        layers[0].active = true
        const datasetId = layers[0].dataset

        let newLayerGroup = {}
        newLayerGroup[datasetId] = {
          dataset: datasetId,
          visibility: true,
          layers: layers,
        }

        this.handleLayerGroupUpdate({...this.state.layerGroups, ...newLayerGroup})
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

  componentDidMount() {
    const { layerId, datasetId, datasetIds } = this.props.params

    if (layerId) {
      this.fetchLayer(layerId)
    } else if (datasetId) {
      this.fetchDataset(datasetId)
    } else if (datasetIds) {
      datasetIds.forEach(this.fetchDataset)
    }
  }

  render() {
    const { layerGroups } = this.state
    const { style, datasets } = this.props
    const filteredLayerGroups = datasets ?
      datasets.map((dataset) => layerGroups[dataset]).filter((d) => !!d) :
      Object.values(layerGroups)

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
  datasets: PropTypes.array,
  toggleMapLayerGroup: PropTypes.func,
}

export default ResourceWatchMap
