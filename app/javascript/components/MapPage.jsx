import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import withCategories from 'components/withCategories'
import ResourceWatchMap from 'components/ResourceWatchMap'
import MapSideBar from 'components/MapSideBar'
import DatasetsModal from 'components/DatasetsModal'
import styleVariables from 'components/styles/variables'
import Ornamentation from './Ornamentation'

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
      <Ornamentation rotate={false} />
      <span style={{marginLeft: 20}}>Loading...</span>
    </div>
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

  const { colors } = styleVariables()
  const sideDrawerStyle = {
    position: 'absolute',
    width: 500,
    right: 0,
    borderLeft: `1px solid ${colors.border}`,
    height: '100%',
    background: colors.bg,
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
          right: 0,
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
