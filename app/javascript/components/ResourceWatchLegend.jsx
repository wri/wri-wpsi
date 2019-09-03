import React from 'react'
import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  // LegendItemButtonLayers,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonRemove,
  LegendItemButtonInfo,
  LegendItemTypes,
  // LegendItemTimeStep,
  // LegendItemTimeline,
} from 'vizzuality-components'

const ResourceWatchLegend = ({
  style,
  layerGroups,
  onChangeOrder,
  onChangeInfo,
  onChangeOpacity,
  onChangeVisibility,
  // onChangeLayer,
  onRemoveLayer,
}) => {
  return <div style={style}>
    <Legend
      onChangeOrder={onChangeOrder}
      maxHeight={300}
      maxWidth={500}
    >
      {layerGroups.map((layerGroup, i) => (
        <LegendListItem
          index={i}
          key={layerGroup.dataset}
          layerGroup={layerGroup}
          toolbar={
            <LegendItemToolbar>
              <LegendItemButtonInfo />
              <LegendItemButtonOpacity />
              <LegendItemButtonVisibility />
              {/*<LegendItemButtonLayers />*/}
              <LegendItemButtonRemove />
            </LegendItemToolbar>
          }
          onChangeInfo={onChangeInfo}
          onChangeOpacity={onChangeOpacity}
          onChangeVisibility={onChangeVisibility}
          // onChangeLayer={onChangeLayer}
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
  onChangeOrder: PropTypes.func.isRequired,
  onChangeInfo: PropTypes.func.isRequired,
  onChangeOpacity: PropTypes.func.isRequired,
  onChangeVisibility: PropTypes.func.isRequired,
  // onChangeLayer: PropTypes.func.isRequired,
  onRemoveLayer: PropTypes.func.isRequired,
}

export default ResourceWatchLegend
