import React from 'react'
import ResourceWatchMap from 'components/ResourceWatchMap'
import MapSideBar from 'components/MapSideBar'
import DatasetsModal from 'components/DatasetsModal'
import { LAYERS } from 'components/datasets'

const MapPage = () => {
  const [activeLayers, setActiveLayers] = React.useState(LAYERS.filter(layer => layer.initially_on))
  const activeLayerIds = activeLayers.map(l => l.id)

  const [modalOpen, setModalOpen] = React.useState(false)

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
  }

  return <React.Fragment>
    <ResourceWatchMap
      style={{
        position: 'absolute',
        top: 85,
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
        activeLayers={activeLayers}
        selectedRegion={selectedRegion}
        onRemoveLayer={removeLayer}
      />

      <DatasetsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isActive={isActive}
        onToggleLayerClick={handleToggleLayerClick}
      />
    </div>


  </React.Fragment>
}

export default MapPage
