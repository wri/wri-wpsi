import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  main: {
    height: '100%',
    overflow: 'auto',
  },
  contentContainer: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    flex: '1 1 auto',
  },
}

const StaticPage = ({ page, classes }) => {
  return (
    <main className={classes.main}>
      <div className={classes.contentContainer}>
        <content dangerouslySetInnerHTML={{__html: page.content}} />
      </div>
    </main>
  )
}

import PropTypes from 'prop-types'
StaticPage.propTypes = {
  page: PropTypes.exact({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(StaticPage)
