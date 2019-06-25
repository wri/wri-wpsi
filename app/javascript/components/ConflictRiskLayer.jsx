import React from 'react'
import { GeoJSON } from 'react-leaflet'
import RegionPopup from 'components/RegionPopup'

const ConflictRiskLayer = (props) => {
  const { features, selectedRegionGid0, selectedRegionGid2, onEachFeature, getRiskColor } = props

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
    feature.selected = feature.properties.gid_0 == selectedRegionGid0
    const region = feature.properties

    return <ExtendedGeoJSON
      data={feature}
      selected={feature.selected ? 1 : 0}
      key={feature.properties.cartodb_id}
      onEachFeature={onEachFeature}
      style={style}
      isOpen={region.gid_2 == selectedRegionGid2}
    >
      <RegionPopup region={region} />
    </ExtendedGeoJSON>
  }

  let ret = features.map(featureToGeoJSON).sort((a, b) => {
    return b.props.selected - a.props.selected
  })

  return ret
}

const ExtendedGeoJSON = (props) => {
  const { isOpen } = props

  const openPopup = (feature) => {
    if (isOpen) {
      feature && feature.leafletElement.openPopup()
    } else {
      feature && feature.leafletElement.closePopup()
    }
  }

  return (
    <GeoJSON ref={el => openPopup(el)} {...props}/>
  )
}

import PropTypes from 'prop-types'
ConflictRiskLayer.propTypes = {
  features: PropTypes.array.isRequired,
  selectedRegionGid0: PropTypes.string,
}
ExtendedGeoJSON.propTypes = {
  isOpen: PropTypes.bool,
}

export default ConflictRiskLayer
