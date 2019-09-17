import React from 'react'
import { Link } from 'react-router-dom'

const LAYERS = window.layers || []

const renderMapTable = (title, rows) => {
  return (
    <React.Fragment>
      <h1>{title}</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return <tr key={row.name + row.id}>
              <td>{row.name}</td>
              <td><Link to={`/${title.toLowerCase()}/${row.id}`}>{row.id}</Link></td>
            </tr>
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

const LayersList = () => {
  return <div style={{
    borderBottom: '1px solid #B8C5D0',
    padding: 19,
  }}>
    {renderMapTable('Layers', LAYERS)}
  </div>
}

export default LayersList
