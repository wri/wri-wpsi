import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuBar = () => {
  const containerStyle = {
    margin: 9,
    fontSize: 21,
    width: '100%',
  }

  const adminPortalLinkStyle = {
    float: 'right',
  }

  const inactiveLinkStyle = {
    color: '#999',
    textDecoration: 'none',
    margin: 25,
    display: 'inline-block',
    fontWeight: 'normal',
  }

  const activeLinkStyle = {
    color: 'black',
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
