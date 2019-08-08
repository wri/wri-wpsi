import React from 'react'
import ResourceWatchMap from 'components/ResourceWatchMap'

const LayerMapPage = ({ match }) => {
  const { params } = match

  const layerIds = params.layerId ? [params.layerId] : []

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

  return (
    <ResourceWatchMap
      layerIds={layerIds}
      style={{
        position: 'absolute',
        top: 85,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      // activeLayers={activeLayers}
      onToggleLayer={() => null}
      onChangeLayerOrder={() => null}
      setSelectedRegion={() => null}
      interactionState={interactionState}
    />
  )
}

import PropTypes from 'prop-types'
LayerMapPage.propTypes = {
  match: PropTypes.object.isRequired,
}

export default LayerMapPage
