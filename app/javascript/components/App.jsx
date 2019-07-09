import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TopBanner from 'components/TopBanner'
import MapPage from 'components/MapPage'
import AboutPage from 'components/AboutPage'
import MethodologyPage from 'components/MethodologyPage'

const App = () => {
  const globalStyles = {
    font: '14px/16px Myriad Pro, PT Sans, Arial, Helvetica, sans-serif',
    color: '#4D4D4D',
  }

  return (
    <Router>
      <div style={globalStyles}>
        <TopBanner />

        <Route path="/" exact component={MapPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/methodology" component={MethodologyPage} />
      </div>
    </Router>
  )
}

export default App
