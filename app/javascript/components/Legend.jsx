import React from 'react'
import Control from 'react-leaflet-control'

const Legend = (props) => {
  const { title, legendConfig } = props

  const containerStyle = {
    padding: '6px 18px',
    background: 'rgba(255,255,255,0.8)',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    borderRadius: '5px',
    lineHeight: '18px',
    maxWidth: '150px',
  }

  const items = legendConfig.items

  const renderLegendItems = () => {
    return items.map(({ id, color, name }) => (
      <div
        style={{
          margin: 10,
        }}
        key={id}
      >
        <i style={{
          background: color,
          width: 18,
          height: 18,
          float: 'left',
          marginRight: 8,
          opacity: 1,
        }}></i>
        {name}<br />
      </div>
    ))
  }

  return <Control position="bottomleft">
    <div style={containerStyle}>
      <h3>{title}</h3>
      {renderLegendItems()}
    </div>
  </Control>
}

import PropTypes from 'prop-types'
Legend.propTypes = {
  title: PropTypes.string.isRequired,
  legendConfig: PropTypes.object.isRequired,
}

export default Legend
