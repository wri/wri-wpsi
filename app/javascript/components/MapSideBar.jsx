import React from 'react'

const MapSideBar = ({ setModalOpen, activeLayers, selectedRegion }) => {
  return (
    <React.Fragment>
      <h1>Investigation</h1>

      <button onClick={() => setModalOpen(true)}>
        + Add datasets to investigation
      </button>

      <div style={{marginTop: 20}}>
        <h3>Current Datasets:</h3>

        <ul>
          {
            activeLayers.map(layer =>
              <li key={layer.id} style={{marginTop: 10}}>
                {layer.name}
              </li>
            )
          }
        </ul>
      </div>

      {selectedRegion && <div style={{marginTop: 20}}>
        <h3>Selected Region:</h3>
        <p>{selectedRegion.description}</p>

        <ul>
          <li>Latitude: {selectedRegion.location.lat}</li>
          <li>Longitude: {selectedRegion.location.lng}</li>
        </ul>
      </div>}
    </React.Fragment>
  )
}

import PropTypes from 'prop-types'
MapSideBar.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  activeLayers: PropTypes.array.isRequired,
  selectedRegion: PropTypes.object,
}

export default MapSideBar
