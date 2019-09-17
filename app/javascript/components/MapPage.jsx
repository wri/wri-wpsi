import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import ResourceWatchMap from 'components/ResourceWatchMap'
import MapSideBar from 'components/MapSideBar'
import DatasetsModal from 'components/DatasetsModal'
import withCategories from 'components/withCategories'

const MapPage = ({ match, history, layers, categories }) => {
  if (layers.length == 0) {
    return <div>Loading...</div>
  }

  const maskLayer = layers.find(layer => layer.maskLayer)
  const [activeLayers, setActiveLayers] = React.useState(layers.filter(layer => layer.initially_on))
  const activeLayerIds = activeLayers.map(l => l.id)

  const [modalOpen, setModalOpen] = React.useState(true)

  const [selectedRegion, setSelectedRegion] = React.useState(null)

  const [layerGroupsInteraction, setMapLayerGroupsInteraction] = React.useState({})
  const [layerGroupsInteractionSelected, setMapLayerGroupsInteractionSelected] = React.useState(null)
  const [layerGroupsInteractionLatLng, setMapLayerGroupsInteractionLatLng] = React.useState(null)

  const updateInteractions = (interaction) => {
    const newLayerGroupsInteraction = {
      ...layerGroupsInteraction,
      [interaction.id]: interaction,
    }
    setMapLayerGroupsInteraction(newLayerGroupsInteraction)
  }

  const interactionState = {
    layerGroupsInteraction,
    setMapLayerGroupsInteraction: updateInteractions,
    layerGroupsInteractionSelected,
    setMapLayerGroupsInteractionSelected,
    layerGroupsInteractionLatLng,
    setMapLayerGroupsInteractionLatLng,
  }


  const isActive = (layer) => {
    return activeLayerIds.includes(layer.id)
  }

  const getLayer = (id) => {
    return layers.find((layer) => layer.id === id)
  }

  const addLayer = (layer) => {
    setActiveLayers([layer].concat(activeLayers))
  }

  const removeLayer = (layer) => {
    setActiveLayers(activeLayers.filter((activeLayer) => activeLayer.id != layer.id))
  }

  const toggleLayer = (layer) => {
    isActive(layer) ? removeLayer(layer) : addLayer(layer)
  }

  const handleToggleLayerClick = (e) => {
    const layerId = e.target.id.replace('layer-', '')
    toggleLayer(getLayer(layerId))
  }

  const handleToggleLayer = ({ layer }) => {
    toggleLayer(layer)
  }

  const handleChangeLayerOrder = layerIds => {
    const layers = activeLayers
    setActiveLayers([]) // TODO: figure out a better way to force an update here
    setActiveLayers(layers.sort((a, b) => (layerIds.indexOf(a.id) - layerIds.indexOf(b.id))))
  }

  const sideDrawerStyle = {
    position: 'absolute',
    width: 500,
    right: 0,
    borderLeft: '1px solid #B6C6BC',
  }

  const currentPath = match.path

  return <React.Fragment>
    <ResourceWatchMap
      style={{
        position: 'absolute',
        top: 85,
        bottom: 0,
        left: 0,
        right: 500,
      }}
      layerIds={layers.map((layer) => layer.id)}
      activeLayers={activeLayers}
      onToggleLayer={handleToggleLayer}
      onChangeLayerOrder={handleChangeLayerOrder}
      setSelectedRegion={setSelectedRegion}
      interactionState={interactionState}
    />

    <div style={sideDrawerStyle}>
      <MapSideBar
        setModalOpen={setModalOpen}
        maskLayer={maskLayer}
        activeLayers={activeLayers}
        selectedRegion={selectedRegion}
        onRemoveLayer={removeLayer}
        onToggleLayer={handleToggleLayer}
      />

      <Route
        path={`${currentPath}/datasets/:category`}
        render={
          ({ match }) => (
            <DatasetsModal
              open={modalOpen}
              onClose={() => history.push(currentPath)}
              isActive={isActive}
              onToggleLayerClick={handleToggleLayerClick}
              tab={match.params.category}
              layers={layers.filter(layer => !layer.maskLayer)}
              categories={categories}
            />
          )
        }
      />
    </div>


  </React.Fragment>
}

import PropTypes from 'prop-types'
MapPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

export default withRouter(withCategories(MapPage))
