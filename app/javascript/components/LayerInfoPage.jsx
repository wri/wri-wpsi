import React from 'react'
import { withRouter } from 'react-router-dom'

const LayerInfoPage = ({ match, history }) => {
  const { params } = match

  const layerId = params.layerId
  const layer = window.layers.find(layer => layer.id === layerId)

  const modalBackgroundStyle = {
    position: 'fixed',
    zIndex: '10001',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
  const modalStyle = {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  }

  return (
    <div style={modalBackgroundStyle}>
      <div style={modalStyle}>
        <h1>{layer.name}</h1>

        <p>
          {layer.long_description || 'A long description of this dataset is not yet available.'}
        </p>

        <button onClick={() => history.goBack()}>Close</button>
      </div>
    </div>
  )
}

import PropTypes from 'prop-types'
LayerInfoPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(LayerInfoPage)
