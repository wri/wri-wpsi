import React from 'react'
import injectSheet from 'react-jss'
import styleVariables from './styles/variables'
import Ornamentation from './Ornamentation'

const styleVars = styleVariables()
const { colors } = styleVars
const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.header,
    flex: '0 1 auto',
    overflow: 'hidden',
  },
  rightContent: {
    marginLeft: 'auto',
    display: 'flex',
  },
  credit: {
    color: 'white',
    fontFamily: styleVars.fonts.heading,
    margin: 0,
    padding: [18, 15],
    lineHeight: 1,
    marginBottom: -2,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
      textDecoration: 'underline',
    }
  }
}

const Footer = ({classes}) => {
  return <footer id='footer' className={classes.wrapper}>
      <div className={classes.rightContent}>
        <Ornamentation />
        <p className={classes.credit}>
          This site is maintained by <a href='https://www.wri.org/' className={classes.link}>World Resource Institute</a>.
        </p>
      </div>
    </footer>
}

import PropTypes from 'prop-types'
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(Footer)
