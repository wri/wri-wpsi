import React from 'react'
import LayerTags from 'components/LayerTags'

const LayerCard = ({ layer, variant, excludedTag, secondaryAction }) => {
  const containerStyle = {
    backgroundColor: variant === 'white' ? '#FFFFFF' : '#EBEEEF',
    padding: variant === 'white' ? '4px 0px' : '4px 24px',
    borderBottom: '1px solid #B6C6BC',
  }

  const titleAreaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '2em',
  }

  const moreLinkStyle = {
    paddingLeft: '5px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: 'smaller',
  }

  if (variant === 'simple') {
    return (
      <div style={containerStyle}>
        <div style={titleAreaStyle}>
          <h2>{layer.name}</h2>
          {secondaryAction}
        </div>
      </div>
    )
  } else {
    return (
      <div style={containerStyle}>
        <div style={titleAreaStyle}>
          <h2>{layer.name}</h2>
          {secondaryAction}
        </div>
        <p>
          {layer.short_description}
          <a href="#" style={moreLinkStyle}>Learn more &gt;</a>
        </p>
        <div style={{marginBottom: '15px'}}>
          <LayerTags layer={layer} excludedTag={excludedTag} />
        </div>
      </div>
    )
  }
}

import PropTypes from 'prop-types'
LayerCard.propTypes = {
  layer: PropTypes.object.isRequired,
  variant: PropTypes.string,
  excludedTag: PropTypes.string,
  secondaryAction: PropTypes.object,
}

export default LayerCard
