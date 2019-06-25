import React from 'react'
import { GeoJSON } from 'react-leaflet'

const ConflictRiskLayer = (props) => {
  const { features, selectedRegionGid0, selectedRegionGid2, onEachFeature, renderPopup, getRiskColor } = props

  const style = (feature) => {
    return {
      'color': feature.selected ? 'black' : 'white',
      'fillColor': getRiskColor(feature.properties.dec2018),
      'weight': feature.selected ? 5 : 1,
      'opacity': 1,
      'fillOpacity': 1,
    }
  }

  const featureToGeoJSON = (feature) => {
    feature.selected = feature.properties.gid_0 == selectedRegionGid0 || feature.properties.gid_2 == selectedRegionGid2

    return <GeoJSON
      data={feature}
      selected={feature.selected ? 1 : 0}
      key={feature.properties.cartodb_id}
      onEachFeature={onEachFeature}
      style={style}
    >
      {renderPopup(feature.properties)}
    </GeoJSON>
  }

  let ret = features.map(featureToGeoJSON).sort((a, b) => {
    return b.props.selected - a.props.selected
  })

  return ret
}

import PropTypes from 'prop-types'
ConflictRiskLayer.propTypes = {
  features: PropTypes.array.isRequired,
  selectedRegionGid0: PropTypes.string,
}

export default ConflictRiskLayer
