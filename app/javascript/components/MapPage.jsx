import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import withCategories from 'components/withCategories'
import ResourceWatchMap from 'components/ResourceWatchMap'
import MapSideBar from 'components/MapSideBar'
import DatasetsModal from 'components/DatasetsModal'
import styleVariables from 'components/styles/variables'
// import Ornamentation from './Ornamentation'
import LoadingAnimation from './LoadingAnimation'

const MapPage = ({ match, history, layers, categories }) => {
  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto',
    overflow: 'hidden',
    fontFamily: styleVariables().fonts.heading,
    fontSize: 50,
  }

  if (layers.length === 0) {
    return <div style={loadingStyle}>
      <LoadingAnimation rotate={false} />
    </div>
  }

  const maskLayers = layers.filter(layer => layer.mask)
  const [activeLayers, setActiveLayers] = React.useState(layers.filter(layer => layer.initially_on))
  const activeLayerIds = activeLayers.map(l => l.id)

  const [selectedRegion, setSelectedRegion] = React.useState(null)

  const [layerGroupsInteraction, setMapLayerGroupsInteraction] = React.useState({})
  const [layerGroupsInteractionSelected, setMapLayerGroupsInteractionSelected] = React.useState(null)
  const [layerGroupsInteractionLatLng, setMapLayerGroupsInteractionLatLng] = React.useState(null)

  const [layerListOpen, setLayerListOpen] = React.useState(false)

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
    if (!layer.mask) {
      // Trigger a Google Analytics event
      window.dataLayer.push({'event': 'Dataset Added', 'dataset': layer.name})
    }

    setActiveLayers([layer].concat(activeLayers))
  }

  const removeLayer = (layer) => {
    setActiveLayers(activeLayers.filter((activeLayer) => activeLayer.id != layer.id))
  }

  const toggleLayer = (layer) => {
    isActive(layer) ? removeLayer(layer) : addLayer(layer)
  }

  const handleToggleLayerClick = (e) => {
    const layerId = e.currentTarget.id.replace('layer-', '')
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

  const handleListToggle = (e) => {
    const sideBar = document.querySelector('.c-drawer')
    let actionMethod = 'add'
    const button = e.target
    const isActive = button.classList.contains('active')
    if (isActive) {
      actionMethod = 'remove'
    }
    sideBar.classList[actionMethod]('active')
    button.classList[actionMethod]('active')
    setLayerListOpen(!isActive)
  }

  const sideDrawerStyle = {
    overflow: 'auto',
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
          right: 0,
        }}
        layerIds={layers.map((layer) => layer.id)}
        activeLayers={activeLayers}
        onToggleLayer={handleToggleLayer}
        onChangeLayerOrder={handleChangeLayerOrder}
        setSelectedRegion={setSelectedRegion}
        interactionState={interactionState}
      />

      <Route
        path={currentPath}
        exact
        render={
          () => (
            <button
              data-active={layerListOpen}
              onClick={handleListToggle}
              className={`mobile-layer-toggle${layerListOpen ? ' active' : ''}`}
              id='mobile-layer-toggle'
            >
              {layerListOpen ? 'Hide' : 'Show'} datasets list
            </button>
          )
        }
      />

      <div className='c-drawer' style={sideDrawerStyle}>
        <MapSideBar
          maskLayers={maskLayers}
          activeLayers={activeLayers}
          selectedRegion={selectedRegion}
          onRemoveLayer={removeLayer}
          onToggleLayer={handleToggleLayer}
        />
      </div>

      <Route
        path={`${currentPath}/datasets/:category`}
        render={
          ({ match }) => (
            <DatasetsModal
              open={true}
              onClose={() => history.push(currentPath)}
              isActive={isActive}
              onToggleLayerClick={handleToggleLayerClick}
              tab={match.params.category}
              layers={layers.filter(layer => !layer.mask)}
              categories={categories}
            />
          )
        }
      />
    </main>
  )
}

import PropTypes from 'prop-types'
MapPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

export default withRouter(withCategories(MapPage))
