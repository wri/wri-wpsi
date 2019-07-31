import React from 'react'
import ResourceWatchMap from 'components/ResourceWatchMap'

class LayerMap extends React.Component {
  render() {
    return <ResourceWatchMap params={this.props.match.params} bottom={0} />
  }
}

import PropTypes from 'prop-types'
LayerMap.propTypes = {
  match: PropTypes.object.isRequired,
}

export default LayerMap
