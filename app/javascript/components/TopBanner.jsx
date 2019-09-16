import React from 'react'
import MenuBar from 'components/MenuBar'

const TopBanner = () => {
  return <header id='top-banner' style={{
      position: 'sticky',
      top: 0,
      zIndex: 10000,
      backgroundColor: 'white',
      flex: '0 1 auto',
    }}>
    <div style={{
      display: 'flex',
      borderBottom: '1px solid #B8C5D0',
      alignItems: 'center',
    }}>
      <div style={{
        margin: '19px',
        fontSize: '33px',
        whiteSpace: 'nowrap',
      }}>
        Water, Peace & Security
      </div>
      <MenuBar selectedItem='map' onClick={() => null} />
    </div>
  </header>
}

export default TopBanner
