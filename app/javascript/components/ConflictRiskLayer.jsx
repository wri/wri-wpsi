import React from 'react'
import { GeoJSON, FeatureGroup } from 'react-leaflet'
import Legend from 'components/Legend'
import RegionPopup from 'components/RegionPopup'

const ConflictRiskLayer = (props) => {
  const { features, selectedRegionGid0, selectedRegionGid2, onEachFeature } = props

  const style = (feature) => {
    return {
      'color': feature.highlighted ? 'black' : 'white',
      'fillColor': getRiskColor(feature.properties.dec2018),
      'weight': feature.highlighted ? 5 : 1,
      'opacity': 1,
      'fillOpacity': 1,
    }
  }

  const getRiskColor = (risk) => {
    return risk >= 1 ?   '#800026' :
           risk >= 0.9 ? '#BD0026' :
           risk >= 0.8 ? '#E31A1C' :
           risk >= 0.7 ? '#FC4E2A' :
           risk >= 0.6 ? '#FD8D3C' :
           risk >= 0.5 ? '#FEB24C' :
           risk >= 0.4 ? '#FED976' :
                         '#FFEDA0';
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

  return <FeatureGroup>
    {features.map(featureToGeoJSON)}
    <Legend title='Risk of Conflict' getColor={getRiskColor} />
  </FeatureGroup>
}

const ExtendedGeoJSON = (props) => {
  const { isOpen, isInFront } = props

  const highjackElement = (feature) => {
    const leafletElement = feature && feature.leafletElement

    if (leafletElement) {
      isOpen ? leafletElement.openPopup() : leafletElement.closePopup()
      if (isInFront) leafletElement.bringToFront()
    }
  }

  return (
    <GeoJSON ref={el => highjackElement(el)} {...props}/>
  )
}

import PropTypes from 'prop-types'
ConflictRiskLayer.propTypes = {
  features: PropTypes.array.isRequired,
  selectedRegionGid0: PropTypes.string,
  selectedRegionGid2: PropTypes.string,
  onEachFeature: PropTypes.func.isRequired,
}
ExtendedGeoJSON.propTypes = {
  isOpen: PropTypes.bool,
  isInFront: PropTypes.bool,
}

export default ConflictRiskLayer
