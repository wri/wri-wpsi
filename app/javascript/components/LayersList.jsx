import React from 'react'
import { Link } from 'react-router-dom'

const layers = [
  {layerId: '107b72a6-6a52-4c8e-a261-d01706627322', name: 'WPSI Risk of Conflict Model Output'},
  {layerId: '16a5729f-0f2e-4cd6-84bc-0f72c9132dda', name: 'Global Power Plant Database'},
  {layerId: '969fe99d-b861-46a1-8c8e-7c44cbafd1d6', name: 'Population Density (Grid, 1 km)'},
  {layerId: '2a694289-fec9-4bfe-a6d2-56c3864ec349', name: 'Recent Internal Displacement'},
  {layerId: '3a52f7ed-0c20-4691-981b-3a3521b069aa', name: 'Food Price Spikes'},
  {layerId: '1ee0784f-654f-4caf-a059-f03dc46724b6', name: 'Food Price Spikes'},
  {layerId: '253437ed-1e21-4544-8bb3-1ec2d2656522', name: 'Food Price Spikes'},
  {layerId: '2c7ddb1a-6a21-4f6c-a5a3-696e92bcf053', name: 'Food Price Spikes'},
  {layerId: '43804fe4-8c9a-42fc-8c85-2a494727cf3d', name: 'Food Price Spikes'},
]

const LayersList = () => {
  return <div style={{
    borderBottom: '1px solid #B8C5D0',
    padding: 19,
  }}>
    <h1>Layers</h1>

    <ul>
      {layers.map((layer) => {
        return <li key={layer.layerId}>
          {layer.name} - <Link to={"/layers/" + layer.layerId}>{layer.layerId}</Link>
        </li>
      })}
    </ul>
  </div>
}

export default LayersList
