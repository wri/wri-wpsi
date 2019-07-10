import React from 'react'

const RegionInfoBox = ({ region }) => {
  const style = {
    margin: 20,
    padding: 20,
    width: 500,
    borderRadius: 4,
    border: '1px solid'
  }

  if (region) {
    return <table style={style}>
      <thead>
        <tr>
          <td colSpan={2}>
            <h3>
              {region.properties.name_2}, {region.properties.name_1} ({region.properties.name_0})
            </h3>
          </td>
        </tr>
      </thead>
      <tbody>
        {Object.keys(region.properties).sort().map((attribute) => {
            return (
              <tr key={attribute}>
                <td><b>{attribute}:</b></td>
                <td>{region.properties[attribute]}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  } else {
    return null
  }
}

import PropTypes from 'prop-types'
RegionInfoBox.propTypes = {
  region: PropTypes.object.isRequired,
}

export default RegionInfoBox
