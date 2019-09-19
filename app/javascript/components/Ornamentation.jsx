
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
    transform: 'rotate(16deg)',
    height: '110%',
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

const Ornamentation = ({classes}) => {
  return <div className={classes.ornamentation} >
    <div className={classes.line + ' ' + classes.line1}/>
    <div className={classes.line + ' ' + classes.line2}/>
    <div className={classes.line + ' ' + classes.line3}/>
  </div>
}

import PropTypes from 'prop-types'
Ornamentation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(Ornamentation)
