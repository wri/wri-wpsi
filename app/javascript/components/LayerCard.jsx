import React from 'react'
import { Link } from 'react-router-dom'
import LayerTags from 'components/LayerTags'

const LayerCard = ({ layer, variant, excludedTag, secondaryAction, children }) => {
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
        <p style={{marginTop: 0}}>
          <a href={layer.source_url}>{layer.source_name}</a>
          {layer.source_description && `, ${layer.source_description}`}
        </p>
        <p>
          {layer.short_description}
          <Link to={`/map/learn_more/${layer.id}`} style={moreLinkStyle}>
            Learn more &gt;
          </Link>
        </p>
        <div style={{marginBottom: '15px'}}>
          <LayerTags layer={layer} excludedTag={excludedTag} />
        </div>
        {children}
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
