import React from 'react'
import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  // LegendItemButtonLayers,
  // LegendItemButtonOpacity,
  // LegendItemButtonVisibility,
  // LegendItemButtonInfo,
  LegendItemTypes,
  // LegendItemTimeStep,
  // LegendItemTimeline,
} from 'vizzuality-components'

const ResourceWatchLegend = ({ style, layerGroups, onRemoveLayer}) => {
  return <div style={style}>
    <Legend
      onChangeOrder={(datasetIds) => {console.info(datasetIds)}}
      maxHeight={300}
      maxWidth={500}
    >
      {layerGroups.map((layerGroup, i) => (
        <LegendListItem
          index={i}
          key={layerGroup.legendKey}
          layerGroup={layerGroup}
          toolbar={
            <LegendItemToolbar>
            </LegendItemToolbar>
          }
          // onChangeInfo={this.handleChangeInfo}
          // onChangeOpacity={this.handleChangeOpacity}
          // onChangeVisibility={this.handleChangeVisibility}
          // onChangeLayer={this.handleChangeLayer}
          onRemoveLayer={onRemoveLayer}
        >
          <LegendItemTypes />
        </LegendListItem>
      ))}
    </Legend>
  </div>
}

import PropTypes from 'prop-types'
ResourceWatchLegend.propTypes = {
  style: PropTypes.object,
  layerGroups: PropTypes.array.isRequired,
  onRemoveLayer: PropTypes.func.isRequired,
}

export default ResourceWatchLegend
