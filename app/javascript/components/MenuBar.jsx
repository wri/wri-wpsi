import React from 'react'
import { NavLink } from 'react-router-dom'
import styleVariables from './styles/variables'

const MenuBar = () => {
  const containerStyle = {
    fontSize: 21,
    width: '100%',
  }

  const adminPortalLinkStyle = {
    float: 'right',
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

  return <div style={containerStyle}>
    <NavLink
      to='/map'
      exact
      style={inactiveLinkStyle}
      activeStyle={activeLinkStyle}
    >
      Map
    </NavLink>

    <NavLink
      to='/methodology'
      style={inactiveLinkStyle}
      activeStyle={activeLinkStyle}
    >
      Methodology
    </NavLink>

    <NavLink
      to='/about'
      style={inactiveLinkStyle}
      activeStyle={activeLinkStyle}
    >
      About Us
    </NavLink>

    <a
      href='/admin'
      style={{...inactiveLinkStyle, ...adminPortalLinkStyle}}
    >
      Admin Portal
    </a>
  </div>
}

export default MenuBar
