import React from 'react'
import { LAYERS } from 'components/datasets'

const MapSideBar = ({ isActive, onToggleLayerClick }) => {
  return (
    <React.Fragment>
      <h1>Layers</h1>

      <table>
        <tbody>
          {LAYERS.map((layer) => {
            return <tr key={layer.name + layer.id}>
              <td>{layer.name}</td>
              <td style={{width: 80, textAlign: 'right'}}>
                <button id={layer.id} onClick={onToggleLayerClick}>
                  {isActive(layer) ? 'Showing' : 'Hidden'}
                </button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

import PropTypes from 'prop-types'
MapSideBar.propTypes = {
  isActive: PropTypes.func.isRequired,
  onToggleLayerClick: PropTypes.func.isRequired,
}

export default MapSideBar
