
import React from 'react'
import styleVariables from './styles/variables'
import injectSheet from 'react-jss'

const styleVars = styleVariables()
const styles = {
  ornamentation: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 25,
  },
  line: {
    display: 'block',
    width: 5,
    marginRight: 2,
    height: '110%',
  },
  rotate: {
    transform: 'rotate(16deg)',
  },
  line1: {
    backgroundColor: styleVars.colors.links.default,
  },
  line2: {
    backgroundColor: styleVars.colors.positive,
  },
  line3: {
    backgroundColor: styleVars.colors.warning,
  },
  nav: {
    marginLeft: 'auto',
  }
}

const Ornamentation = ({classes, rotate=true}) => {
  return <div className={classes.ornamentation} >
    {
      [1,2,3].map((l) => {
        const lineClass = classes[`line${l}`]
        return <div key={l} className={`${rotate ? classes.rotate : ''} ${classes.line} ${lineClass}`} />
      })
    }
  </div>
}

import PropTypes from 'prop-types'
Ornamentation.propTypes = {
  classes: PropTypes.object.isRequired,
  rotate: PropTypes.bool,
}

export default injectSheet(styles)(Ornamentation)
