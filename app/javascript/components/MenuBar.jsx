import React from 'react'
import { NavLink } from 'react-router-dom'
import withPages from 'components/withPages'
import styleVariables from './styles/variables'

const MenuBar = ({ pages }) => {
  const containerStyle = {
    fontSize: 21,
    width: '100%',
  }

  const inactiveLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: 25,
    display: 'inline-block',
    fontWeight: 'normal',
    ':hover': {
      color: styleVariables().colors.primary,
    },
  }

  const activeLinkStyle = {
    color: styleVariables().colors.primary,
    fontWeight: '600',
  }

  const staticContentPageLinks = pages.map(
    page => (
      <NavLink
        to={`/info/${page.slug}`}
        key={page.slug}
        style={inactiveLinkStyle}
        activeStyle={activeLinkStyle}
      >
        {page.name}
      </NavLink>
    )
  )

  return <div style={containerStyle}>
    <NavLink
      to='/map'
      exact
      style={inactiveLinkStyle}
      activeStyle={activeLinkStyle}
    >
      Map
    </NavLink>

    {staticContentPageLinks}
  </div>
}

import PropTypes from 'prop-types'
MenuBar.propTypes = {
  pages: PropTypes.array.isRequired,
}

export default withPages(MenuBar)
