import React from 'react'
import VizzMap from 'components/VizzMap'

class LayerMap extends React.Component {
  render() {
    return <VizzMap params={this.props.match.params} bottom={0} />
  }
}

import PropTypes from 'prop-types'
LayerMap.propTypes = {
  match: PropTypes.object.isRequired,
}

export default LayerMap
