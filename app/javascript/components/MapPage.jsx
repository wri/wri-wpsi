import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import ResourceWatchMap from 'components/ResourceWatchMap'
import MapSideBar from 'components/MapSideBar'
import DatasetsModal from 'components/DatasetsModal'
import styleVariables from 'components/styles/variables'

const MASK_LAYER = {
  id: 'c7e76588-6da5-4645-8842-2d2ac0001110',
  name: 'Highlight areas of water stress',
}
const LAYERS = [...window.layers, MASK_LAYER]

const MapPage = ({ match, history }) => {
  const [activeLayers, setActiveLayers] = React.useState(LAYERS.filter(layer => layer.initially_on))
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
    return LAYERS.find((layer) => layer.id === id)
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
    height: '100%',
    background: styleVariables().colors.bg,
    display: 'flex',
  }

  const mainStyle = {
    flex: '1 1 auto',
    position: 'relative',
  }

  const currentPath = match.path

  return (
    <main style={mainStyle}>
      <ResourceWatchMap
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 500,
        }}
        layerIds={LAYERS.map((layer) => layer.id)}
        activeLayers={activeLayers}
        onToggleLayer={handleToggleLayer}
        onChangeLayerOrder={handleChangeLayerOrder}
        setSelectedRegion={setSelectedRegion}
        interactionState={interactionState}
      />

      <div style={sideDrawerStyle}>
        <MapSideBar
          setModalOpen={setModalOpen}
          maskLayer={MASK_LAYER}
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
              />
            )
          }
        />
      </div>
    </main>
  )
}

import PropTypes from 'prop-types'
MapPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(MapPage)
