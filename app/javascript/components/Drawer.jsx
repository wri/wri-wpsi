import React from 'react'
import Control from 'react-leaflet-control'

const Drawer = ({ selectedRegion }) => {
  const containerStyle = {
    padding: '6px 18px',
    background: 'rgba(255,255,255,1)',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    borderRadius: '5px',
    width: '400px',
  }

  const region = selectedRegion.properties

  return <Control position="topleft">
    <div style={containerStyle}>
      <h1>
        {region.name_2}, {region.name_1}, {region.name_0}
      </h1>

      <h3>
        Risk of Conflict in December 2018: {Math.round(region.dec2018 * 100)}%
      </h3>

      <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Line_integral_of_scalar_field.gif" alt=""/>
    </div>
  </Control>
}

import PropTypes from 'prop-types'
Drawer.propTypes = {
  selectedRegion: PropTypes.object.isRequired,
}

export default Drawer
