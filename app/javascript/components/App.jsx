import React from 'react'
import MainMap from 'components/MainMap'

class App extends React.Component {
  render () {
    return <React.Fragment>
      <h1>Water, Peace & Security</h1>
      <p>Proof of concept with data from <a href="https://resourcewatch.org/data/explore/Powerwatch">resourcewatch.org</a>.</p>
      <MainMap />
    </React.Fragment>
  }
}

export default App
