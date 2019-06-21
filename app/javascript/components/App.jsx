import React from 'react'
import TopBanner from 'components/TopBanner'
import MenuBar from 'components/MenuBar'
import MainMap from 'components/MainMap'

class App extends React.Component {
  render () {
    return <React.Fragment>
      <TopBanner />
      <MenuBar selectedItem='map' />
      <MainMap />
    </React.Fragment>
  }
}

export default App
