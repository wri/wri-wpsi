import React from 'react'
import { GeoJSON, FeatureGroup } from 'react-leaflet'
import RegionPopup from 'components/RegionPopup'

const ConflictRiskLayer = (props) => {
  const { layer, selectedRegionGid2, onEachFeature } = props

  const style = (feature) => {
    return {
      'color': feature.highlighted ? 'black' : '#FFF',
      'fillColor': getRiskColor(feature.properties.dec2018),
      'weight': feature.highlighted ? 5 : 0.5,
      'opacity': 1,
      'fillOpacity': 1,
    }
  }

  const getRiskColor = (risk) => {
    return risk >= 0.9 ? '#b10026' :
           risk >= 0.8 ? '#e31a1c' :
           risk >= 0.7 ? '#fc4e2a' :
           risk >= 0.6 ? '#fd8d3c' :
           risk >= 0.5 ? '#feb24c' :
           risk >= 0.4 ? '#fed976' :
           risk >= 0.0001 ? '#ffffb2' :
                         '#bdbdbd';
  }

  const featureToGeoJSON = (feature) => {
    const region = feature.properties

    feature.highlighted = region.gid_2 == selectedRegionGid2
    feature.selected = region.gid_2 == selectedRegionGid2

    return <ExtendedGeoJSON
      data={feature}
      key={region.cartodb_id}
      onEachFeature={onEachFeature}
      style={style}
      isOpen={feature.selected}
      isInFront={feature.highlighted}
    >
      {region == 'hide_for_now' && <RegionPopup region={region} />}
    </ExtendedGeoJSON>
  }

  return <FeatureGroup>
    {layer.data.features.map(featureToGeoJSON)}
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
  layer: PropTypes.object.isRequired,
  selectedRegionGid0: PropTypes.string,
  selectedRegionGid2: PropTypes.string,
  onEachFeature: PropTypes.func.isRequired,
}
ExtendedGeoJSON.propTypes = {
  isOpen: PropTypes.bool,
  isInFront: PropTypes.bool,
}

export default ConflictRiskLayer
