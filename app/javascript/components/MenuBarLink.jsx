import React from 'react'

const MenuBarLink = (props) => {
  const {to, selected, text} = props
  const style = {
    textDecoration: selected ? 'underline' : 'none',
    margin: 25,
  }

  if (selected) {
    return <span style={style}>{text}</span>
  } else {
    return <a href={to} style={style}>{text}</a>
  }
}

export default MenuBarLink
