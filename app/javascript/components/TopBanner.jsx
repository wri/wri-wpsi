import React from 'react'
import MenuBar from 'components/MenuBar'

const TopBanner = () => {
  return <div id='top-banner' style={{
      position: 'sticky',
      top: 0,
      zIndex: 10000,
      backgroundColor: 'white',
    }}>
    <div style={{
      display: 'flex',
      borderBottom: '1px solid #B8C5D0',
    }}>
      <div style={{
        margin: '19px',
        fontSize: '33px',
        lineHeight: '40px',
        whiteSpace: 'nowrap',
      }}>
        Water, Peace & Security
      </div>
      <MenuBar selectedItem='map' onClick={() => null} />
    </div>
  </div>
}

export default TopBanner
