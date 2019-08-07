import React from 'react'
import { Icon, LegendItemButtonRemove } from 'vizzuality-components'
import LayerCard from 'components/LayerCard'
import Switch from 'react-switch'

const MapSideBar = ({ setModalOpen, activeLayers, selectedRegion, onRemoveLayer }) => {
  const [checked, setChecked] = React.useState(false)

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #B6C6BC',
  }

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
    backgroundColor: '#003F6A',
    borderRadius: '4px',
    textTransform: 'uppercase',
    padding: '8px',
    height: '36px',
  }

  const iconStyle = {
    fill: '#FFFFFF',
    backgroundColor: '#003F6A',
    height: '20px',
    width: '20px',
    marginRight: '8px',
  }

  return (
    <React.Fragment>
      <div style={headerStyle}>
        <h1>Investigation</h1>

        <button style={buttonStyle} onClick={() => setModalOpen(true)}>
          <Icon name="icon-plus" style={iconStyle} />
          Add datasets to investigation
        </button>
      </div>

      <LayerCard
        variant='simple'
        layer={{name: 'Highlight areas of water stress'}}
        secondaryAction={
          <Switch
            onChange={(value) => setChecked(value)}
            checked={checked}
            onColor={'#003F6A'}
            offColor={'#B6C6BC'}
            checkedIcon={false}
            uncheckedIcon={false}
            className='square-switch'
          />
        }
      />

      {
        activeLayers.map(layer =>
          <LayerCard
            key={layer.id}
            layer={layer}
            onRemoveLayer={onRemoveLayer}
            secondaryAction={
              <LegendItemButtonRemove
                onRemoveLayer={() => onRemoveLayer(layer)}
                tooltipText='Hide'
              />
            }
          />
        )
      }

      {selectedRegion && <div style={{marginTop: 20}}>
        <h3>Selected Region:</h3>
        <p>{selectedRegion.description}</p>

        <ul>
          <li>Latitude: {selectedRegion.location.lat}</li>
          <li>Longitude: {selectedRegion.location.lng}</li>
        </ul>
      </div>}
    </React.Fragment>
  )
}

import PropTypes from 'prop-types'
MapSideBar.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  onRemoveLayer: PropTypes.func.isRequired,
  activeLayers: PropTypes.array.isRequired,
  selectedRegion: PropTypes.object,
}

export default MapSideBar
