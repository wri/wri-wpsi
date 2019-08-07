import React from 'react'
import Switch from 'react-switch'
import { LegendItemButtonRemove } from 'vizzuality-components'

const LayerCard = ({ layer, variant, onRemoveLayer }) => {
  const [checked, setChecked] = React.useState(false)

  const containerStyle = {
    backgroundColor: '#EBEEEF',
    padding: '4px 24px',
    borderBottom: '1px solid #B6C6BC',
  }

  const titleAreaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const moreLinkStyle = {
    paddingLeft: '5px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: 'smaller',
  }

  const tagStyle = {
    // border: '2px solid #B6C6BC',
    // borderRadius: '16px',
    // backgroundColor: 'white',
    // padding: '5px 15px',
    marginRight: '15px',
    textDecoration: 'none',
    fontSize: 'smaller',
  }

  if (variant === 'simple') {
    return (
      <div style={containerStyle}>
        <div style={titleAreaStyle}>
          <h2>{layer.name}</h2>
          <Switch
            onChange={(value) => setChecked(value)}
            checked={checked}
            onColor={'#003F6A'}
            offColor={'#B6C6BC'}
            checkedIcon={false}
            uncheckedIcon={false}
            className='square-switch'
          />
        </div>
      </div>
    )
  } else {
    return (
      <div style={containerStyle}>
        <div style={titleAreaStyle}>
          <h2>{layer.name}</h2>
          <LegendItemButtonRemove
            onRemoveLayer={() => onRemoveLayer(layer)}
            tooltipText='Hide'
          />
        </div>
        <p>
          Description goes here.
          <a href="#" style={moreLinkStyle}>Learn more &gt;</a>
        </p>
        <div style={{marginBottom: '15px'}}>
          <a style={tagStyle} href="#">{layer.category}</a>
          <a style={tagStyle} href="#">Tag 2</a>
          <a style={tagStyle} href="#">Tag 3</a>
          <a href="#" style={moreLinkStyle}>More &gt;</a>
        </div>
      </div>
    )
  }
}

import PropTypes from 'prop-types'
LayerCard.propTypes = {
  layer: PropTypes.object.isRequired,
  variant: PropTypes.string,
  onRemoveLayer: PropTypes.func,
}

export default LayerCard
