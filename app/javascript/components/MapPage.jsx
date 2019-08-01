import React from 'react'
import ResourceWatchMap from 'components/ResourceWatchMap'
import { LAYERS } from 'components/datasets'

const MapPage = () => {
  const [activeLayers, setActiveLayers] = React.useState([LAYERS[0]])

  const getLayer = (id) => {
    return LAYERS.find((layer) => layer.id === id)
  }

  const handleAdd = (e) => {
    const layer = getLayer(e.target.id)
    addLayer(layer)
  }

  const handleRemove = (e) => {
    const layer = getLayer(e.target.id)
    removeLayer(layer)
  }

  const addLayer = (layer) => {
    setActiveLayers([layer].concat(activeLayers))
  }

  const removeLayer = (layer) => {
    setActiveLayers(activeLayers.filter((activeLayer) => activeLayer.id != layer.id))
  }

  const handleToggleLayer = ({ layer, toggle }) => {
    toggle ? addLayer(layer) : removeLayer(layer)
  }

  const handleChangeLayerOrder = layerIds => {
    const layers = activeLayers
    setActiveLayers([]) // TODO: figure out a better way to force an update here
    setActiveLayers(layers.sort((a, b) => (layerIds.indexOf(a.id) - layerIds.indexOf(b.id))))
  }

  const renderLayersTable = (title, rows) => {
    return (
      <React.Fragment>
        <h1>{title}</h1>

        <table>
          <tbody>
            {rows.map((row) => {
              const layerOnMap = activeLayers.map((d) => d.id).includes(row.id)

              return <tr key={row.name + row.id}>
                <td>{row.name}</td>
                <td style={{width: 80, textAlign: 'right'}}>
                  <button id={row.id} onClick={layerOnMap ? handleRemove : handleAdd}>
                    {layerOnMap ? 'Showing' : 'Hidden'}
                  </button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </React.Fragment>
    )
  }

  const sideDrawerStyle = {
    position: 'absolute',
    width: 500,
    right: 0,
  }

  return <React.Fragment>
    <ResourceWatchMap
      style={{
        position: 'absolute',
        top: 85,
        bottom: 0,
        left: 0,
        right: 500,
      }}
      params={{layerIds: LAYERS.map((layer) => layer.id)}}
      activeLayers={activeLayers}
      onToggleLayer={handleToggleLayer}
      onChangeLayerOrder={handleChangeLayerOrder}
    />
    <div style={sideDrawerStyle}>
      <div style={{margin: 30}}>
        {renderLayersTable('Layers', LAYERS)}
      </div>
    </div>
  </React.Fragment>
}

export default MapPage
