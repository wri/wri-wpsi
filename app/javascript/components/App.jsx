import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import withLayers from 'components/withLayers'
import withPages from 'components/withPages'
import TopBanner from 'components/TopBanner'
import Footer from 'components/Footer'
import MapPage from 'components/MapPage'
import StaticPage from 'components/StaticPage'
import LayersList from 'components/LayersList'
import LayerMapPage from 'components/LayerMapPage'
import LayerInfoPage from 'components/LayerInfoPage'
import { Icons } from 'vizzuality-components'
import { ThemeProvider } from 'react-jss'
import styleVariables from './styles/variables'

// Fix LayerManager-Firefox compatability issue
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()

const App = ({ layers, pages }) => {
  const globalStyles = {
    font: `14px/16px ${styleVariables().fonts.body}`,
    color: '#4D4D4D',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }

  const staticPages = pages.map(
    page => (
      <Route
        key={page.slug}
        path={`/info/${page.slug}`}
        render={() => <StaticPage page={page} />}
      />
    )
  )


  return (
    <ThemeProvider theme={globalStyles}>
      <BrowserRouter>
        <div style={globalStyles}>
          {/* Landing page with map */}
          <Route
            path="/map"
            render={() => <MapPage layers={layers} />}
          />
          <Route
            path="/map/learn_more/:layerId"
            render={() => <LayerInfoPage layers={layers} />}
          />

          {/* Static pages */}
          {staticPages}

          {/* Debugging pages, remove before going live! */}
          <Route path="/layers" exact component={LayersList} />
          <Route path="/layers/:layerId" component={LayerMapPage} />
          <Route path="/datasets/:datasetId" component={LayerMapPage} />
          <Footer />
        </div>

        {/* Include Vizzuality icons for use in other Vizzuality components */}
        <Icons />
      </BrowserRouter>
    </ThemeProvider>
  )
}

import PropTypes from 'prop-types'
App.propTypes = {
  layers: PropTypes.array.isRequired,
  pages: PropTypes.array.isRequired,
}

export default withLayers(withPages(App))
