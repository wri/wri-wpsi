import React from 'react'
import Control from 'react-leaflet-control'
import Graph from 'images/placeholder_graph.png';

const Drawer = ({ selectedRegion, onClose }) => {
  const containerStyle = {
    padding: '6px 18px',
    background: 'rgba(255,255,255,1)',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    borderRadius: '5px',
    width: '400px',
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #B8C5D0',
  }

  const sectionStyle = {
    borderBottom: '1px solid #B8C5D0',
  }

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'flex-end',
  }

  const region = selectedRegion.properties

  return <Control position="topright">
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>
          {region.name_2}, {region.name_1}, {region.name_0}
        </h1>

        <div style={{paddingTop: '20px'}}>
          <button onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h3>Risk of Conflict</h3>
          <div style={{padding: '10px', fontSize: '20px'}}>{Math.round(region.dec2018 * 100)}%</div>
        </div>
        <img src={Graph} style={{width: '400px'}} alt="Risk of Conflict Graph"/>
      </div>
    </div>
  </Control>
}

import PropTypes from 'prop-types'
Drawer.propTypes = {
  selectedRegion: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Drawer
