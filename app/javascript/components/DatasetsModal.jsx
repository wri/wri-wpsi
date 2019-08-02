import React from 'react'
import { LAYERS } from 'components/datasets'
import { Icon } from 'vizzuality-components'

const DatasetsModal = ({ open, onClose, isActive, onToggleLayerClick }) => {
  if (open) {
    const modalBackgroundStyle = {
      position: 'fixed',
      zIndex: '10001',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',
    }
    const modalStyle = {
      backgroundColor: '#fefefe',
      margin: '15% auto',
      padding: '20px',
      border: '1px solid #888',
      width: '80%',
    }
    const closeButtonStyle = {
      padding: '0',
      border: '0',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      outline: 'none',
    }

    return (
      <div style={modalBackgroundStyle}>
        <div style={modalStyle}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1>Add Datasets to Investigation</h1>

              <button style={closeButtonStyle} onClick={onClose} aria-label="Close">
                <Icon name="icon-cross" className="-small" />
              </button>
          </div>

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
        </div>
      </div>
    )
  } else {
    return null
  }
}

import PropTypes from 'prop-types'
DatasetsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired,
  onToggleLayerClick: PropTypes.func.isRequired,
}

export default DatasetsModal
