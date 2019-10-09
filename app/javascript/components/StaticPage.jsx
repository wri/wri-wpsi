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
    content: PropTypes.object.isRequired,
  }).isRequired,
}

export default StaticPage
