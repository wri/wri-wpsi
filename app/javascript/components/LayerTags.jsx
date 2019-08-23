import React from 'react'
import { withRouter } from 'react-router-dom'

const CATEGORIES = window.categories

const LayerTags = ({ history, layer, excludedTag }) => {
  const tagStyle = {
    marginRight: '15px',
    fontSize: 'smaller',
    borderRadius: '16px',
    backgroundColor: '#F4F4F4',
    padding: '5px 15px',
    cursor: 'pointer',
  }

  return layer.category_slugs.map(category_slug => (
    category_slug === excludedTag ?
      null :
      <span
        style={tagStyle}
        key={category_slug}
        onClick={() => history.push(`/map/datasets/${category_slug}`)}
      >
        {CATEGORIES.find(category => category.slug == category_slug).title}
      </span>
  ))
}

import PropTypes from 'prop-types'
LayerTags.propTypes = {
  history: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  excludedTag: PropTypes.string,
}

export default withRouter(LayerTags)
