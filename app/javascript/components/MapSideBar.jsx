import React from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, LegendItemButtonRemove } from 'vizzuality-components'
import LayerCard from 'components/LayerCard'
import Switch from 'react-switch'

const MapSideBar = ({
  history,
  maskLayer,
  activeLayers,
  selectedRegion,
  onRemoveLayer,
  onToggleLayer,
}) => {
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

  const renderRegionInfo = (region) => {
    return (
      <div style={headerStyle}>
        <i>
          {region.name_2 && `${region.name_2} ${region.engtype_2}, `}
          {region.name_1 && `${region.name_1}, `}
          {region.name_0}
        </i>
      </div>
    )
  }

  const renderMaskLayerCard = (layer) => (
    <LayerCard
      variant='simple'
      layer={layer}
      secondaryAction={
        <Switch
          onChange={() => onToggleLayer({ layer })}
          checked={activeLayers.includes(layer)}
          onColor={'#003F6A'}
          offColor={'#B6C6BC'}
          checkedIcon={false}
          uncheckedIcon={false}
          className='square-switch'
        />
      }
    />
  )

  const renderLayerCard = (layer) => (
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

  return (
    <div id='sidebar'>
      <div style={headerStyle}>
        <h1>Investigation</h1>

        <button style={buttonStyle} onClick={() => history.push('/map/datasets/water')}>
          <Icon name="icon-plus" style={iconStyle} />
          Add datasets to investigation
        </button>
      </div>

      {selectedRegion && renderRegionInfo(selectedRegion)}

      {maskLayer && renderMaskLayerCard(maskLayer)}

      {
        activeLayers
          .filter(layer => layer.id != maskLayer.id)
          .map(layer => renderLayerCard(layer))
      }
    </div>
  )
}

import PropTypes from 'prop-types'
MapSideBar.propTypes = {
  history: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  onRemoveLayer: PropTypes.func.isRequired,
  onToggleLayer: PropTypes.func.isRequired,
  maskLayer: PropTypes.object,
  activeLayers: PropTypes.array.isRequired,
  selectedRegion: PropTypes.object,
}

export default withRouter(MapSideBar)
