import React from 'react'
import LayerGroupsMap from 'components/LayerGroupsMap'
import ResourceWatchLegend from 'components/ResourceWatchLegend'

class ResourceWatchMap extends React.Component {
  state = {
    layerGroups: {},
    mapLocation: {},
  }

  addLayerGroup = (layer) => {
    const { layerGroups } = this.state

    layerGroups[layer.id] = {
      dataset: layer.id,
      visibility: true,
      layers: [layer],
    }

    this.setState({ layerGroups })
  }

  handleRemoveLayer = (layer) => {
    const { onToggleLayer } = this.props

    onToggleLayer({
      layer: layer,
      toggle: false,
    })
  }

  handleChangeOpacity = (layer, opacity) => {
    const { layerGroups } = this.state
    layerGroups[layer.id].layers[0] = { ...layer, opacity }
    this.setState({ layerGroups })
  }

  handleChangeVisibility = (layer, visibility) => {
    const { onToggleLayer } = this.props

    // Just toggle the layer completely for now
    onToggleLayer({
      layer: layer,
      toggle: visibility,
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
        layer.active = true
        this.addLayerGroup(layer)
      })
  }

  fetchDataset = (datasetId) => {
    const datasetUrl = `https://api.resourcewatch.org/v1/dataset/${datasetId}/layer`

    fetch(datasetUrl)
      .then(response => response.json())
      .then(response => {
        const layers = response.data.map(this.reformatLayer)

        if (layers.length == 0) {
          alert(`Dataset ${datasetId} has no layers!`)
          return
        }

        layers[0].active = true

        layers.forEach(layer => {
          this.addLayerGroup(layer)
        })
      })
  }

  filterLayerGroups = () => {
    const { layerGroups } = this.state
    const { activeLayers } = this.props

    // Return all layers if activeLayers is not defined
    if (!activeLayers) return Object.values(layerGroups)

    const activeLayerIds = activeLayers.map(layer => layer.id)

    let filteredLayerGroups = activeLayerIds.map(layerId => layerGroups[layerId])
    filteredLayerGroups = filteredLayerGroups.filter(lg => !!lg) // Filter out nulls

    filteredLayerGroups.forEach(layerGroup => {
      layerGroup.layers.forEach(layer => layer.active = activeLayerIds.includes(layer.id))
      if (!layerGroup.layers.some(layer => layer.active)) layerGroup.layers[0].active = true
    })

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
    const { style, onChangeLayerOrder, interactionState } = this.props
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
    }

    return (
      <div style={style}>
        <LayerGroupsMap
          style={mapStyle}
          mapLocation={this.state.mapLocation}
          setMapLocation={(location) => this.setState({mapLocation: location})}
          layerGroups={filteredLayerGroups}
          resetMapLayerGroupsInteraction={(args) =>
            alert('resetMapLayerGroupsInteraction not yet defined!', args)
          }
          { ...interactionState }
        />
        <ResourceWatchLegend
          style={legendStyle}
          layerGroups={filteredLayerGroups}
          onRemoveLayer={this.handleRemoveLayer}
          onChangeInfo={(layer) => alert(`Info about layer ${layer.id}`)}
          onChangeOpacity={this.handleChangeOpacity}
          onChangeVisibility={this.handleChangeVisibility}
          onChangeOrder={onChangeLayerOrder}
        />
      </div>
    )
  }
}

import PropTypes from 'prop-types'
ResourceWatchMap.propTypes = {
  style: PropTypes.object,
  params: PropTypes.object.isRequired,
  interactionState: PropTypes.object.isRequired,
  activeLayers: PropTypes.array,
  onToggleLayer: PropTypes.func.isRequired,
  onChangeLayerOrder: PropTypes.func.isRequired,
}

export default ResourceWatchMap
