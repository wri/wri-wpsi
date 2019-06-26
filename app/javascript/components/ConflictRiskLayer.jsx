import React from 'react'
import { GeoJSON } from 'react-leaflet'
import RegionPopup from 'components/RegionPopup'

const ConflictRiskLayer = (props) => {
  const { features, selectedRegionGid0, selectedRegionGid2, onEachFeature, getRiskColor } = props

  const style = (feature) => {
    return {
      'color': feature.highlighted ? 'black' : 'white',
      'fillColor': getRiskColor(feature.properties.dec2018),
      'weight': feature.highlighted ? 5 : 1,
      'opacity': 1,
      'fillOpacity': 1,
    }
  }

  const featureToGeoJSON = (feature) => {
    const region = feature.properties

    feature.highlighted = region.gid_0 == selectedRegionGid0
    feature.selected = region.gid_2 == selectedRegionGid2

    return <ExtendedGeoJSON
      data={feature}
      key={region.cartodb_id}
      onEachFeature={onEachFeature}
      style={style}
      isOpen={feature.selected}
      isInFront={feature.highlighted}
    >
      <RegionPopup region={region} />
    </ExtendedGeoJSON>
  }

  return features.map(featureToGeoJSON)
}

const ExtendedGeoJSON = (props) => {
  const { isOpen, isInFront } = props

  const highjackElement = (feature) => {
    if (isOpen) {
      feature && feature.leafletElement.openPopup()
    } else {
      feature && feature.leafletElement.closePopup()
    }

    if (isInFront) feature && feature.leafletElement.bringToFront()
  }

  return (
    <GeoJSON ref={el => highjackElement(el)} {...props}/>
  )
}

import PropTypes from 'prop-types'
ConflictRiskLayer.propTypes = {
  features: PropTypes.array.isRequired,
  selectedRegionGid0: PropTypes.string,
}
ExtendedGeoJSON.propTypes = {
  isOpen: PropTypes.bool,
  isInFront: PropTypes.bool,
}

export default ConflictRiskLayer
