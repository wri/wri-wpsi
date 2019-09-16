import React from 'react'
import { Link } from 'react-router-dom'
import LayerTags from 'components/LayerTags'
import styleVariables from 'components/styles/variables'

const LayerCard = ({ layer, variant, excludedTag, secondaryAction }) => {
  const styleVars = styleVariables()
  const containerStyle = {
    padding: '15px',
    borderTop: `2px solid ${styleVars.colors.gray1}`,
    borderRadius: variant === 'white' ? 4 : 0,
    borderBottomRightRadius: '4px',
    boxShadow: styleVars.boxShadow,
    background: 'white',
    flex: variant === 'simple' ? '0 1 auto' : '1 1 auto',
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
