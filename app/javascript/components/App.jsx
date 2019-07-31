import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import TopBanner from 'components/TopBanner'
import MapPage from 'components/MapPage'
import AboutPage from 'components/AboutPage'
import MethodologyPage from 'components/MethodologyPage'
import LayersList from 'components/LayersList'
import LayerMap from 'components/LayerMap'
import { Icons } from 'vizzuality-components'

const App = () => {
  const globalStyles = {
    font: '14px/16px Myriad Pro, PT Sans, Arial, Helvetica, sans-serif',
    color: '#4D4D4D',
  }

  return (
    <BrowserRouter basename={'map'}>
      <div style={globalStyles}>
        <TopBanner />

        <Route path="/" exact component={MapPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/methodology" component={MethodologyPage} />
        <Route path="/layers" exact component={LayersList} />
        <Route path="/layers/:layerId" component={LayerMap} />
        <Route path="/datasets/:datasetId" component={LayerMap} />
      </div>

      {/* Include Vizzuality icons for use in other Vizzuality components */}
      <Icons />
    </BrowserRouter>
  )
}

export default App
