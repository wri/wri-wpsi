import React from 'react'
import LayerGroupsMap from 'components/LayerGroupsMap'

class VizzMap extends React.Component {
  state = {
    layerGroups: {},
  }

  handleLayerGroupUpdate = (updatedLayerGroups) => {
    this.setState({layerGroups: updatedLayerGroups})
  }

  reformLayer = (layer) => {
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
        const layers = [response.data].map(this.reformLayer)

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
        const layers = response.data.map(this.reformLayer)

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
    const { datasets, toggleMapLayerGroup, bottomGutter } = this.props
    const filteredLayerGroups = datasets ?
      datasets.map((dataset) => layerGroups[dataset]).filter((d) => !!d) :
      Object.values(layerGroups)

    return <div>
      <LayerGroupsMap
        layerGroups={filteredLayerGroups}
        bottomGutter={bottomGutter}
        toggleMapLayerGroup={toggleMapLayerGroup}
      />
    </div>
  }
}

import PropTypes from 'prop-types'
VizzMap.propTypes = {
  params: PropTypes.object.isRequired,
  datasets: PropTypes.array,
  toggleMapLayerGroup: PropTypes.func,
  bottomGutter: PropTypes.number,
}

export default VizzMap
