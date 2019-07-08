import React from 'react'
import { GeoJSON, FeatureGroup } from 'react-leaflet'
import GenericPopup from 'components/GenericPopup'

const WriLayer = (props) => {
  const { features, onEachFeature } = props

  const featureToGeoJSON = (feature) => {
    return <GeoJSON
      data={feature}
      key={feature.properties.cartodb_id}
      onEachFeature={onEachFeature}
    >
      <GenericPopup attributes={feature.properties} />
    </GeoJSON>
  }

  return <FeatureGroup>
    {features.map(featureToGeoJSON)}
  </FeatureGroup>
}

import PropTypes from 'prop-types'
WriLayer.propTypes = {
  features: PropTypes.array.isRequired,
  onEachFeature: PropTypes.func.isRequired,
}

export default WriLayer
