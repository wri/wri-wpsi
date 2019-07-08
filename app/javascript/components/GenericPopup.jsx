import React from 'react'
import { Popup } from 'react-leaflet'

const GenericPopup = (props) => {
  const { attributes } = props

  return <Popup>
    <h3>{attributes.name}</h3>
    {Object.keys(attributes).sort().map((attribute) => {
        return (
          <div key={attribute}>
            <b>{attribute}:</b> {attributes[attribute]}
          </div>
        )
      })
    }
  </Popup>
}

import PropTypes from 'prop-types'
GenericPopup.propTypes = {
  attributes: PropTypes.object.isRequired,
}

export default GenericPopup
