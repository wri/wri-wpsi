import React from 'react'
import MenuBar from 'components/MenuBar'
import Ornamentation from './Ornamentation'
import styleVariables from './styles/variables'
import injectSheet from 'react-jss'

const styleVars = styleVariables()
const styles = {
  wrapper: {
    flex: '0 1 auto',
    fontFamily: styleVars.fonts.heading,
    backgroundColor: styleVars.colors.header,
    paddingRight: 5,
    paddingLeft: 20,
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    borderBottom: `1px solid ${styleVars.colors.border}`,
    alignItems: 'center',
  },
  heading: {
    fontSize: '33px',
    whiteSpace: 'nowrap',
    fontWeight: '600',
    color: 'white',
    letterSpacing: '.06em',
  },
  nav: {
    marginLeft: 'auto',
  }
}

const TopBanner = ({classes}) => {
  return <header id='top-banner' className={classes.wrapper}>
    <div className={classes.content}>
      <div className={classes.heading}>
        Water, Peace & Security
      </div>
      <Ornamentation />
      <div className={classes.nav}>
        <MenuBar selectedItem='map' onClick={() => null} />
      </div>
    </div>
  </header>
}

import PropTypes from 'prop-types'
TopBanner.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(TopBanner)
