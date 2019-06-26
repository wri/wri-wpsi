import React from 'react'
import { Popup } from 'react-leaflet'

const RegionPopup = (props) => {
  const { region } = props

  return <Popup>
    <h3>{region.name_2}</h3>
    <div><b>Type:</b> {region.engtype_2}</div>
    <div><b>{region.engtype_1}:</b> {region.name_1}</div>
    <div><b>Country:</b> {region.name_0}</div>
    <h1>Risk of conflict: {Math.round(region.dec2018 * 100)}%</h1>
    <div>(December 2018)</div>
  </Popup>
}

import PropTypes from 'prop-types'
RegionPopup.propTypes = {
  region: PropTypes.object.isRequired,
}

export default RegionPopup
