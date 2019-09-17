import React from 'react'
import MenuBar from 'components/MenuBar'

const TopBanner = () => {
  return <header id='top-banner' style={{
      position: 'sticky',
      top: 0,
      zIndex: 10000,
      backgroundColor: 'white',
      flex: '0 1 auto',
      fontFamily: 'PT Sans, sans-serif',
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
