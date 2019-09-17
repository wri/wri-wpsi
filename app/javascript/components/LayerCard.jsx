import React from 'react'
import { Link } from 'react-router-dom'
import LayerTags from 'components/LayerTags'
import styleVariables from 'components/styles/variables'
import injectSheet from 'react-jss'

const styleVars = styleVariables()
const sourceStyle = {
  fontStyle: 'italic',
  fontSize: '13px',
  lineHeight: '1.2'
}
const styles = {
  container: {
    marginBottom: '10px',
    borderTop: `2px solid ${styleVars.colors.gray1}`,
    borderBottom: 0,
    borderBottomRightRadius: '4px',
    background: 'rgba(255,255,255,1)',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  simple: {
    marginBottom: 0,
    flex: '0 1 auto',
    boxShadow: 'none',
    borderBottom: `2px solid ${styleVars.colors.gray3}`,
    borderTop: 0,
    borderRadius: 'none',
  },
  white: {
    borderRadius: 4,
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '2em',
    padding: '10px 15px 0 15px',
  },
  title: {
    marginBottom: 5,
  },
  content: {
    padding: '0 15px',
    flex: '1 0 auto',
  },
  contentDescription: {
    paddingRight: '10%',
    margin: '0 0 5px 0',
  },
  moreLink: {
    paddingLeft: 5,
    textDecoration: 'none',
    marginLeft: 'auto',
  },
  footer: {
    borderTop: `1px solid ${styleVars.colors.gray3}`,
    padding: '10px 15px',
    display: 'flex',
    marginTop: 'auto',
    flex: '0 1 auto',
  },
  source: {
    margin: '0 0 15px 0',
  },
  sourceLink: sourceStyle,
  sourceDescription: sourceStyle,

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
          <h2 className={classes.title}>{layer.name}</h2>
          {secondaryAction}
        </header>
        <div className={classes.content}>
          <p className={classes.contentDescription}>
            {layer.short_description}
          </p>
          <p className={classes.source}>
            <a className={classes.sourceLink} href={layer.source_url}>{layer.source_name}</a>
            <span className={classes.sourceDescription}>{layer.source_description && `, ${layer.source_description}`}</span>
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
