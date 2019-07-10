import React from 'react'
import { Popup } from 'react-leaflet'

const GenericInteraction = ({ attributes, config }) => {
  return config.output && <Popup>
    {config.output.map((item) => {
        return (
          <div key={item.column}>
            <b>{item.property}:</b>
            {
              attributes[item.column] ?
                <span> {item.prefix} {attributes[item.column]} {item.suffix}</span> :
                <span> No data</span>
            }
          </div>
        )
      })
    }
  </Popup>
}

import PropTypes from 'prop-types'
GenericInteraction.propTypes = {
  config: PropTypes.object.isRequired,
  attributes: PropTypes.object.isRequired,
}

export default GenericInteraction
