import React from 'react'
import { Link } from 'react-router-dom'
import LayerTags from 'components/LayerTags'
import styleVariables from 'components/styles/variables'

const LayerCard = ({ layer, variant, excludedTag, secondaryAction }) => {
  const styleVars = styleVariables()
  const containerStyle = {
    marginBottom: variant !== 'white' ? '10px' : 0,
    borderTop: variant !== 'simple' ? `2px solid ${styleVars.colors.gray1}` : 0,
    borderBottom: variant === 'simple' ? `2px solid ${styleVars.colors.primary}` : 0,
    borderRadius: variant === 'white' ? 4 : 0,
    borderBottomRightRadius: '4px',
    boxShadow: variant !== 'simple' ? styleVars.boxShadow : 'none',
    background: 'white',
    flex: variant === 'simple' ? '0 1 auto' : '1 1 auto',
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '2em',
    padding: '10px 15px 0 15px',
  }

  const moreLinkStyle = {
    paddingLeft: '5px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: 'smaller',
    marginLeft: 'auto',
  }

  const footerStyle = {
    borderTop: `1px solid ${styleVars.colors.bg}`,
    padding: '10px 15px',
    display: 'flex',
  }

  const contentStyle = {
    padding: '5px 15px',
  }

  if (variant === 'simple') {
    return (
      <div style={containerStyle}>
        <header style={{...headerStyle, paddingBottom: '10px'}}>
          <h2>{layer.name}</h2>
          {secondaryAction}
        </header>
      </div>
    )
  } else {
    return (
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h2>{layer.name}</h2>
          {secondaryAction}
        </header>
        <div style={contentStyle}>
          <p style={{marginTop: 0}}>
            <a href={layer.source_url}>{layer.source_name}</a>
            {layer.source_description && `, ${layer.source_description}`}
          </p>
          <div style={{marginBottom: '15px'}}>
            <LayerTags layer={layer} excludedTag={excludedTag} />
          </div>
        </div>
        <footer style={footerStyle}>
          {layer.short_description}
          <Link to={`/map/learn_more/${layer.id}`} style={moreLinkStyle}>
            <i className='icon__book-reader' style={{marginRight: 5}} />
            <span>Learn more</span>
          </Link>
        </footer>
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
