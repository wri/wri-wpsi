import React from 'react'
import { Link } from 'react-router-dom'
import LayerTags from 'components/LayerTags'
import styleVariables from 'components/styles/variables'
import injectSheet from 'react-jss'

const styleVars = styleVariables()
const styles = {
  container: {
    marginBottom: '10px',
    borderTop: `2px solid ${styleVars.colors.gray1}`,
    borderBottom: 0,
    borderBottomRightRadius: '4px',
    boxShadow: styleVars.boxShadow,
    background: 'white',
    flex: '1 1 auto',
  },
  simple: {
    marginBottom: 0,
    flex: '0 1 auto',
    boxShadow: 'none',
    borderBottom: `2px solid ${styleVars.colors.primary}`,
    borderTop: 0
  },
  white: {
    borderRadius: 4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '2em',
    padding: '10px 15px 0 15px',
  },
  moreLink: {
    paddingLeft: '5px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: 'smaller',
    marginLeft: 'auto',
  },
  footer: {
    borderTop: `1px solid ${styleVars.colors.bg}`,
    padding: '10px 15px',
    display: 'flex',
  },
  content: {
    padding: '5px 15px',
  },
}

const LayerCard = ({ layer, variant, excludedTag, secondaryAction, classes }) => {
  const containerClass = `${classes.container} ${classes[variant]}`
  if (variant === 'simple') {
    return (
      <div className={containerClass}>
        <header className={classes.header} style={{paddingBottom: '10px'}}>
          <h2>{layer.name}</h2>
          {secondaryAction}
        </header>
      </div>
    )
  } else {
    return (
      <div className={containerClass}>
        <header className={classes.header}>
          <h2>{layer.name}</h2>
          {secondaryAction}
        </header>
        <div className={classes.content}>
          <p style={{marginTop: 0}}>
            {layer.short_description}
          </p>
          <p style={{marginTop: 0}}>
            <a href={layer.source_url}>{layer.source_name}</a>
            {layer.source_description && `, ${layer.source_description}`}
          </p>
          <div style={{marginBottom: '15px'}}>
            <LayerTags layer={layer} excludedTag={excludedTag} />
          </div>
        </div>
        <footer className={classes.footer}>
          <Link to={`/map/learn_more/${layer.id}`} className={classes.moreLink}>
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
  classes: PropTypes.object,
}

export default injectSheet(styles)(LayerCard)
