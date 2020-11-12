import React from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'components/Modal'
import { Icon } from 'vizzuality-components'
import injectSheet from 'react-jss'
import modalCloseButtonStyle from './styles/modal_close_button'
import defaultButtonStyle from './styles/default_button'

const styles = {
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
  },
  button: {
    ...defaultButtonStyle()
  },
  closeButton: {
    ...modalCloseButtonStyle()
  },
  contentDescription: {
    paddingRight: '10%',
    lineHeight: 1.5,
  },
}

const LayerInfoPage = ({ match, history, classes, layers }) => {
  const { params } = match

  const layerId = params.layerId
  const layer = layers.find(layer => layer.id === layerId)
  const info = layer && layer.long_description || 'A long description of this dataset is not yet available.'

  const onClose = () => history.goBack()

  return (
    <Modal>
      <header className={classes.header}>
        <h1 className={classes.title}>{layer ? layer.name : 'Dataset information not available'}</h1>
        <button className={classes.closeButton} onClick={onClose} aria-label="Close">
          <Icon name="icon-cross" className="-small" />
        </button>
      </header>

      <p className={classes.contentDescription} dangerouslySetInnerHTML={{__html: info}} />

      <button onClick={onClose} className={classes.button}>Close</button>
    </Modal>
  )
}

import PropTypes from 'prop-types'
LayerInfoPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
}
export default withRouter(injectSheet(styles)(LayerInfoPage))
