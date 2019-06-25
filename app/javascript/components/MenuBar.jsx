import React from 'react'
import MenuBarLink from 'components/MenuBarLink'

const MenuBar = (props) => {
  const {selectedItem} = props
  return <div>
    <MenuBarLink to='/' selected={selectedItem === 'map'} text='Map' />
    <MenuBarLink to='/methodology' selected={selectedItem === 'methodology'} text='Methodology' />
    <MenuBarLink to='/about' selected={selectedItem === 'about'} text='About Us' />
  </div>
}

import PropTypes from 'prop-types'
MenuBar.propTypes = {
  selectedItem: PropTypes.string.isRequired,
}

export default MenuBar