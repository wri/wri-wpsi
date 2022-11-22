import React from 'react'
import { withRouter } from 'react-router-dom'
import LayerGroupsMap from 'components/LayerGroupsMap'
import ResourceWatchLegend from 'components/ResourceWatchLegend'

class ResourceWatchMap extends React.Component {
  state = {
    layers: [],
    layerGroups: {},
    mapLocation: {}, // Example: {bbox: [38.65, 8.84, 38.90, 9.08]}
  }

  addLayer = (layer) => {
    const { layers } = this.state
    this.setState({layers: layers.concat([layer])})
  }

  createLayerGroups = () => {
    const { layerGroups, layers } = this.state

    layers.forEach(layer => {
      layerGroups[layer.id] = {
        dataset: layer.id,
        visibility: true,
        layers: [layer],
      }
    })

    this.setState({ layerGroups })
  }

  handleRemoveLayer = (layer) => {
    const { onToggleLayer } = this.props

    onToggleLayer({
      layer: layer,
      toggle: false,
    })
  }

  handleChangeInfo = (layer) => {
    this.props.history.push(`/map/learn_more/${layer.id}`)
  }

  handleChangeOpacity = (layer, opacity) => {
    const { layerGroups } = this.state
    layerGroups[layer.id].layers[0] = { ...layer, opacity }
    this.setState({ layerGroups })
  }

  handleChangeVisibility = (layer, visibility) => {
    const { layerGroups } = this.state
    layerGroups[layer.id].visibility = visibility
    layerGroups[layer.id].layers[0] = { ...layer, visibility }
    this.setState({ layerGroups })
  }

  // The layer definitions we receive from the API are not shaped correctly for
  // ingestion by Vizzuality's LayerManager component. This fixes them.
  prepareLayerForLayerManager = (layer) => {
    return {
      id: layer.id,
      type: layer.type,
      active: true,
      ...layer.attributes,
    }
  }

  fetchLayerDefinition = (layerId) => {
    const layerUrl = `https://api.resourcewatch.org/v1/layer/${layerId}`

    return fetch(layerUrl, {headers: {'Upgrade-Insecure-Requests': 1}})
      .then(response => response.ok ? response.json() : null)
      .then(response => {
        if (response) {
          this.addLayer(this.prepareLayerForLayerManager(response.data))
        } else {
          throw Error(`Layer ${layerId} could not be fetched`)
        }
      })
      .catch(console.log)
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
    const { layerIds } = this.props
    const promises = layerIds.map(this.fetchLayerDefinition)
    Promise.all(promises).then(() => this.createLayerGroups())
  }

  render() {
    const {
      style,
      onChangeLayerOrder,
      interactionState,
      setSelectedRegion,
    } = this.props

    const filteredLayerGroups = this.filterLayerGroups()

    const mapStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }

    const legendStyle = { }

    return (
      <div style={style}>
        <LayerGroupsMap
          style={mapStyle}
          mapLocation={this.state.mapLocation}
          setMapLocation={(location) => this.setState({mapLocation: location})}
          setSelectedRegion={setSelectedRegion}
          layerGroups={filteredLayerGroups}
          resetMapLayerGroupsInteraction={(args) =>
            alert('resetMapLayerGroupsInteraction not yet defined!', args)
          }
          { ...interactionState }
        />
        <div className='wri_api__c-legend-map-wrapper'>
          <ResourceWatchLegend
            style={legendStyle}
            layerGroups={filteredLayerGroups}
            onRemoveLayer={this.handleRemoveLayer}
            onChangeInfo={this.handleChangeInfo}
            onChangeOpacity={this.handleChangeOpacity}
            onChangeVisibility={this.handleChangeVisibility}
            onChangeOrder={onChangeLayerOrder}
          />
        </div>
      </div>
    )
  }
}

import PropTypes from 'prop-types'
ResourceWatchMap.propTypes = {
  style: PropTypes.object,
  history: PropTypes.object.isRequired,
  layerIds: PropTypes.array.isRequired,
  activeLayers: PropTypes.array,
  interactionState: PropTypes.object.isRequired,
  onToggleLayer: PropTypes.func.isRequired,
  onChangeLayerOrder: PropTypes.func.isRequired,
  setSelectedRegion: PropTypes.func.isRequired,
}

export default withRouter(ResourceWatchMap)
