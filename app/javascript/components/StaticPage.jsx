import React from 'react'
import mainStyles from 'components/styles/main_styles'

const StaticPage = ({ page }) => {
  return <main style={mainStyles()}>
    <content dangerouslySetInnerHTML={{__html: page.content}} />
  </main>
}

import PropTypes from 'prop-types'
StaticPage.propTypes = {
  page: PropTypes.exact({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default StaticPage
