import React from 'react'
import styleVariables from 'components/styles/variables'

const Modal = ({ children }) => {
  const modalBackgroundStyle = {
    position: 'fixed',
    zIndex: '10001',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
  const modalStyle = {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '30px 20px 20px 20px',
    border: '1px solid #888',
    width: '80%',
    maxWidth: '1000px',
    boxShadow: styleVariables().boxShadow,
    borderRadius: 4,
    overflow: 'hidden',
  }

  return (
    <div style={modalBackgroundStyle} id='modal-background'>
      <div style={modalStyle} id='modal'>
        {children}
      </div>
    </div>
  )
}

import PropTypes from 'prop-types'
Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Modal
