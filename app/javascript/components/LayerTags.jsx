import React from 'react'
import { withRouter } from 'react-router-dom'
import LayerTag from 'components/LayerTag'

const LayerTags = ({ history, layer, excludedTag }) => {
  return layer.category_slugs.map(category_slug => (
    category_slug === excludedTag ?
      null :
      <LayerTag
        key={category_slug}
        history={history}
        category_slug={category_slug} />
  ))
}

import PropTypes from 'prop-types'
LayerTags.propTypes = {
  history: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  excludedTag: PropTypes.string,
}

export default withRouter(LayerTags)
