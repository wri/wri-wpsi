import React from 'react'
import MenuBar from 'components/MenuBar'
import styleVariables from './styles/variables'

const TopBanner = () => {
  const styleVars = styleVariables()
  return <header id='top-banner' style={{
      position: 'sticky',
      top: 0,
      zIndex: 10000,
      backgroundColor: 'white',
      flex: '0 1 auto',
      fontFamily: styleVars.fonts.heading,
    }}>
    <div style={{
      display: 'flex',
      borderBottom: `1px solid ${styleVars.colors.border}`,
      alignItems: 'center',
    }}>
      <div style={{
        margin: '19px',
        fontSize: '33px',
        whiteSpace: 'nowrap',
        fontWeight: '600',
      }}>
        Water, Peace & Security
      </div>
      <div style={{marginLeft: 'auto'}}>
        <MenuBar selectedItem='map' onClick={() => null} />
      </div>
    </div>
  </header>
}

export default TopBanner
