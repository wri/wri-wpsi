import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import withLayers from 'components/withLayers'
import MapPage from 'components/MapPage'
import LayerInfoPage from 'components/LayerInfoPage'
import { Icons } from 'vizzuality-components'
import { ThemeProvider } from 'react-jss'
import styleVariables from './styles/variables'

// Fix LayerManager-Firefox compatability issue
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()

// Fix fetch-IE compatability issue
import 'whatwg-fetch'

const App = ({ layers }) => {
  const globalStyles = {
    font: `14px/16px ${styleVariables().fonts.body}`,
    color: '#4D4D4D',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }


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
}

export default withLayers(App)
