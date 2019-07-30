import React from 'react'
import VizzMap from 'components/VizzMap'

class MapPage extends React.Component {
  render() {
    const vizzMapStyle = {
      position: 'absolute',
      top: 85,
      bottom: 0,
      width: '100%',
    }

    return <React.Fragment>
      <div style={vizzMapStyle}>
        <VizzMap params={{datasetId: '0c3dfe3b-2cd5-4125-ac84-9ce0a73f34b3'}} />
      </div>
    </React.Fragment>
  }
}

export default MapPage
