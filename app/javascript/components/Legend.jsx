import React from 'react'
import Control from 'react-leaflet-control'

const Legend = (props) => {
  const { title, getColor } = props

  const containerStyle = {
    padding: '6px 18px',
    background: 'rgba(255,255,255,0.8)',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    borderRadius: '5px',
    lineHeight: '18px',
    maxWidth: '150px',
  }

  const grades = [
    1,
    0.9,
    0.8,
    0.7,
    0.6,
    0.5,
    0.4,
  ]

  const renderLegend = () => {
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
    <div style={containerStyle}>
      <h3>{title}</h3>
      {renderLegend()}
    </div>
  </Control>
}

import PropTypes from 'prop-types'
Legend.propTypes = {
  title: PropTypes.string.isRequired,
  getColor: PropTypes.func.isRequired,
}

export default Legend
