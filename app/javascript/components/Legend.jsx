import React from 'react'
import Control from 'react-leaflet-control'

const Legend = (props) => {
  const {getColor} = props

  const renderLegend = () => {
    const grades = [
      1,
      0.9,
      0.8,
      0.7,
      0.6,
      0.5,
      0.4,
    ]

    return grades.map((grade) => (
      <div
        style={{
          margin: 10,
        }}
        key={grade}
      >
        <i style={{
          background: getColor(grade + 0.01),
          width: 18,
          height: 18,
          float: 'left',
          marginRight: 8,
          opacity: 1,
        }}></i>
        &ge; {`${grade * 100}%`} <br />
      </div>
    ))
  }

  return <Control position="bottomright">
    <div
      style={{
        padding: '6px 8px',
        font: '14px/16px Arial, Helvetica, sans-serif',
        background: 'rgba(255,255,255,0.8)',
        boxShadow: '0 0 15px rgba(0,0,0,0.2)',
        borderRadius: '5px',
        lineHeight: '18px',
        color: '#555',
      }}
    >
      {renderLegend()}
    </div>
  </Control>
}

import PropTypes from 'prop-types'
Legend.propTypes = {
  getColor: PropTypes.func.isRequired,
}

export default Legend