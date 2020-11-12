import React from 'react'
import { withRouter } from 'react-router-dom'
import injectSheet from 'react-jss'
import styleVariables from 'components/styles/variables'

const { colors } = styleVariables()
const styles = {
  wrapper:  {
    marginRight: '15px',
    fontSize: 'smaller',
    borderRadius: '16px',
    backgroundColor: colors.gray1,
    padding: '3px 15px',
    cursor: 'pointer',
    fontWeight: '600',
    letterSpacing: '.03em',
    '&:hover': {
      backgroundColor: colors.gray2
    }
  }
}

const LayerTag = ({ history, category, classes }) => {
  return (
    <span
      className={`${classes.wrapper} gtm-category-label`}
      onClick={() => history.push(`/map/datasets/${category.slug}`)}
    >
      {category.title}
    </span>
  )
}


import PropTypes from 'prop-types'
LayerTag.propTypes = {
  history: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withRouter(injectSheet(styles)(LayerTag))
