import React from 'react'
import { withRouter } from 'react-router-dom'
import LayerTag from 'components/LayerTag'

const LayerTags = ({ history, layer, excludedTag }) => {
  return layer.categories.map(category => (
    category.slug === excludedTag ?
      null :
      <LayerTag
        key={category.slug}
        history={history}
        category={category} />
  ))
}

import PropTypes from 'prop-types'
LayerTags.propTypes = {
  history: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  excludedTag: PropTypes.string,
}

export default withRouter(LayerTags)
