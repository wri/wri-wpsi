import React from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, LegendItemButtonRemove } from 'vizzuality-components'
import LayerCard from 'components/LayerCard'
import Switch from 'react-switch'

const MapSideBar = ({ history, activeLayers, selectedRegion, onRemoveLayer }) => {
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
    <div id='sidebar'>
      <div style={headerStyle}>
        <h1>Investigation</h1>

        <button style={buttonStyle} onClick={() => history.push('/map/datasets/water')}>
          <Icon name="icon-plus" style={iconStyle} />
          Add datasets to investigation
        </button>
      </div>

      {selectedRegion && <div style={headerStyle}>
        <i>{selectedRegion.name_2} {selectedRegion.engtype_2}, {selectedRegion.name_1}, {selectedRegion.name_0}</i>
      </div>}

      <LayerCard
        variant='simple'
        layer={{name: 'Highlight areas of water stress', initially_on: true}}
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
    </div>
  )
}

import PropTypes from 'prop-types'
MapSideBar.propTypes = {
  history: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  onRemoveLayer: PropTypes.func.isRequired,
  activeLayers: PropTypes.array.isRequired,
  selectedRegion: PropTypes.object,
}

export default withRouter(MapSideBar)
