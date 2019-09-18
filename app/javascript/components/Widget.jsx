import React from 'react'

const Widget = ({ data, region, fieldName }) => {
  const widgetTitleStyle = {
    fontWeight: 'bold',
    marginBottom: '12px',
  }
  const renderChart = (data) => {
    if (data.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>{fieldName}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(datapoint =>
                <tr key={`${datapoint.gid_2}-${datapoint.month_indep}`}>
                  <td>{datapoint.month_indep}</td>
                  <td>{datapoint[fieldName]}</td>
                </tr>
              )}
           </tbody>
        </table>
      )
    } else {
      return <div>No data...</div>
    }
  }

  if (data && region) {
    return (
      <React.Fragment>
        <div style={widgetTitleStyle}>
          Sample of widget data for region {region.gid_2}
        </div>
        {renderChart(data)}
      </React.Fragment>
    )
  } else {
    return null
  }
}

import PropTypes from 'prop-types'
Widget.propTypes = {
  data: PropTypes.array.isRequired,
  region: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
}

export default Widget
