import React from 'react'
import { GeoJSON, FeatureGroup } from 'react-leaflet'
import GenericInteraction from 'components/GenericInteraction'

const WriLayer = (props) => {
  const { layer, onEachFeature } = props

  const featureToGeoJSON = (feature) => {
    return <GeoJSON
      data={feature}
      key={feature.properties.cartodb_id}
      onEachFeature={onEachFeature}
    >
      <GenericInteraction
        attributes={feature.properties}
        config={layer.attributes.interactionConfig}
      />
    </GeoJSON>
  }

  return <FeatureGroup>
    {layer.data.features.map(featureToGeoJSON)}
  </FeatureGroup>
}

import PropTypes from 'prop-types'
WriLayer.propTypes = {
  layer: PropTypes.object.isRequired,
  onEachFeature: PropTypes.func.isRequired,
}

export default WriLayer
