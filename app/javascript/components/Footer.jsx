import React from 'react'
import injectSheet from 'react-jss'
import styleVariables from './styles/variables'

const styleVars = styleVariables()
const { colors } = styleVars
const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.header,
    padding: [15, 15],
    flex: '0 1 auto',
  },
  credit: {
    color: 'white',
    fontFamily: styleVars.fonts.heading,
    margin: 0,
    padding: 0,
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
      <p className={classes.credit}>
        This site is maintained by <a href='https://www.wri.org/' className={classes.link}>World Resource Institute</a>
      </p>
    </footer>
}

import PropTypes from 'prop-types'
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(Footer)
