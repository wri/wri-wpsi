import React from 'react'
import TopBanner from 'components/TopBanner'
import MenuBar from 'components/MenuBar'
import MainMap from 'components/MainMap'

const App = () => {
  const globalStyles = {
    font: '14px/16px Arial, Helvetica, sans-serif',
    color: '#555',
  }

  return <div style={globalStyles}>
    <TopBanner />
    <MenuBar selectedItem='map' />
    <MainMap />
  </div>
}

export default App
