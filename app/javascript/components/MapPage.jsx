import React from 'react'
import ResourceWatchMap from 'components/ResourceWatchMap'
import { DATASETS } from 'components/datasets'

const MapPage = () => {
  const [datasets, setDatasets] = React.useState([DATASETS[0]])

  const handleAdd = (e) => {
    addDataset({id: e.target.id})
  }

  const handleRemove = (e) => {
    removeDataset({id: e.target.id})
  }

  const addDataset = (dataset) => {
    setDatasets([dataset].concat(datasets))
  }

  const removeDataset = (dataset) => {
    setDatasets(datasets.filter((d) => d.id != dataset.id))
  }

  const toggleMapLayerGroup = ({ dataset, toggle }) => {
    if (toggle) {
      addDataset(dataset)
    } else {
      removeDataset(dataset)
    }
  }

  const renderDatasetsTable = (title, rows) => {
    return (
      <React.Fragment>
        <h1>{title}</h1>

        <table>
          <tbody>
            {rows.map((row) => {
              const datasetOnMap = datasets.map((d) => d.id).includes(row.id)

              return <tr key={row.name + row.id}>
                <td>{row.name}</td>
                <td style={{width: 80, textAlign: 'right'}}>
                  <button id={row.id} onClick={datasetOnMap ? handleRemove : handleAdd}>
                    {datasetOnMap ? 'Remove' : 'Add'}
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
      params={{datasetIds: DATASETS.map((dataset) => dataset.id)}}
      datasets={datasets.map((dataset) => dataset.id)}
      toggleMapLayerGroup={toggleMapLayerGroup}
    />
    <div style={sideDrawerStyle}>
      <div style={{margin: 30}}>
        {renderDatasetsTable('Datasets', DATASETS)}
      </div>
    </div>
  </React.Fragment>
}

export default MapPage
