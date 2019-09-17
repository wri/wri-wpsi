import React from 'react'
import { withRouter } from 'react-router-dom'
import LayerCard from 'components/LayerCard'
import Switch from 'react-switch'
import LayerToggle from 'components/LayerToggle'
import injectSheet from 'react-jss'
import styleVariables from 'components/styles/variables'
import scrollBarStyles  from 'components/styles/scrollbar'
import defaultButtonStyle from 'components/styles/default_button'

const { colors } = styleVariables()
const styles = {
  sideBar:  {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
  },
  locationHeader:  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: colors.primary,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18/16,
    marginBottom: 10,
  },
  addLayerButton:  {
    ...defaultButtonStyle(),
  },
  addLayerButtonIcon:  {
    marginRight: '8px',
  },
  sideBarContent:  {
    padding: '15px 15px 15px 0px',
    flex: '1 1 auto',
    overflow: 'auto',
    ...scrollBarStyles()
  },
}

const MapSideBar = ({
  history,
  maskLayer,
  activeLayers,
  selectedRegion,
  onRemoveLayer,
  onToggleLayer,
  classes
}) => {

  const renderRegionInfo = (region) => {
    const className = `${classes.locationHeader} ${classes.header}`
    return (
      <div className={className}>
        <i>
          {region.name_2 && `${region.name_2} ${region.engtype_2}, `}
          {region.name_1 && `${region.name_1}, `}
          {region.name_0}
        </i>
      </div>
    )
  }

  const renderMaskLayerCard = (layer) => (
    <LayerCard
      variant='simple'
      layer={layer}
      secondaryAction={
        <Switch
          onChange={() => onToggleLayer({ layer })}
          checked={activeLayers.includes(layer)}
          onColor={'#003F6A'}
          offColor={'#B6C6BC'}
          checkedIcon={false}
          uncheckedIcon={false}
          className='square-switch'
        />
      }
    />
  )

  const renderLayerCard = (layer) => (
    <LayerCard
      key={layer.id}
      layer={layer}
      onRemoveLayer={onRemoveLayer}
      secondaryAction={
        <LayerToggle
          text={{
            current: 'Viewing',
            action: 'Remove',
          }}
          icon={{
            current: 'eye',
            action: 'times-solid'
          }}
          classNames='viewing'
          action={() => onRemoveLayer(layer)}
          id={`layer-${layer.id}`}
        />
      }
    />
  )

  const renderAddLayerButton = (inContent=false) => {
    let additionalBtnStyle = {}
    if (inContent) {
      additionalBtnStyle = {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingLeft: 15,
        marginTop: 20,
        marginLeft: -1,
        minWidth: '45%',
      }
    }
    return (
      <button className={classes.addLayerButton} onClick={() => history.push('/map/datasets/water')} style={additionalBtnStyle}>
      <i className={`icon__plus-circle ${classes.addLayerButtonIcon}`} />
        Add datasets
      </button>
    )
  }

  return (
    <div id='sidebar' className={classes.sideBar}>
      <div className={classes.header}>
        <h1 style={{marginBottom: 0}}>Investigation</h1>
        { renderAddLayerButton() }
      </div>

      {selectedRegion && renderRegionInfo(selectedRegion)}

      {maskLayer && renderMaskLayerCard(maskLayer)}

      <div className={classes.sideBarContent}>
        {
          activeLayers
            .filter(layer => layer.id != maskLayer.id)
            .map(layer => renderLayerCard(layer))
        }
        { renderAddLayerButton(true) }
      </div>
    </div>
  )
}

import PropTypes from 'prop-types'
MapSideBar.propTypes = {
  history: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  onRemoveLayer: PropTypes.func.isRequired,
  onToggleLayer: PropTypes.func.isRequired,
  maskLayer: PropTypes.object,
  activeLayers: PropTypes.array.isRequired,
  selectedRegion: PropTypes.object,
  classes: PropTypes.object,
}

export default withRouter(injectSheet(styles)(MapSideBar))
