import React from 'react'
import VizzMap from 'components/VizzMap'

class LayerMap extends React.Component {
  render() {
    const vizzMapStyle = {
      position: 'absolute',
      top: 85,
      bottom: 0,
      width: '100%',
    }

    return <React.Fragment>
      <div style={vizzMapStyle}>
        <VizzMap params={this.props.match.params} />
      </div>
    </React.Fragment>
  }
}

import PropTypes from 'prop-types'
LayerMap.propTypes = {
  match: PropTypes.object.isRequired,
}

export default LayerMap
