import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuBar = () => {
  const containerStyle = {
    margin: 9,
    fontSize: 21,
  }

  const inactiveLinkStyle = {
    color: '#999',
    textDecoration: 'none',
    margin: 25,
    display: 'inline-block',
  }

  const activeLinkStyle = {
    color: 'black',
  }

  return <div style={containerStyle}>
    <NavLink
      to='/'
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
  </div>
}

export default MenuBar
