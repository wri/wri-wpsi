import React from 'react'
import { withRouter } from 'react-router-dom'
import LayerCard from 'components/LayerCard'
import WidgetContainer from 'components/WidgetContainer'

import Switch from 'react-switch'
import LayerToggle from 'components/LayerToggle'
import injectSheet from 'react-jss'
import styleVariables from 'components/styles/variables'
import scrollBarStyles  from 'components/styles/scrollbar'
import defaultButtonStyle from 'components/styles/default_button'

import resourceWatchLogo from '../images/resource_watch_logo.svg'

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
  headerTitle: {
    fontSize: 28,
    marginBottom: 0,
  },
  locationHeader:  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px',
    backgroundColor: colors.accent,
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18/16,
  },
  downloadLinkContainer:  {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '15px',
    fontSize: 'smaller',
    color: 'white',
  },
  downloadLink:  {
    '&:hover': {
      color: colors.links.default,
    },
  },
  downloadIcon:  {
    marginRight: 5,
  },
  addLayerButton:  {
    ...defaultButtonStyle(),
    marginRight: -15,
    paddingRight: 15,
    marginLeft: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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
  maskLayers,
  activeLayers,
  selectedRegion,
  onRemoveLayer,
  onToggleLayer,
  classes
}) => {
  const renderRegionInfo = (region) => {
    const className = `${classes.locationHeader} ${classes.header}`

    if (!region) {
      return (
        <div className={className}>
          <i>Click on the map to select a region</i>
        </div>
      )
    }

    return (
      <div className={className}>
        <i>
          {region.name_2 && `${region.name_2} ${region.engtype_2}, `}
          {region.name_1 && `${region.name_1}, `}
          {region.name_0}
        </i>
        <div className={classes.downloadLinkContainer}>
          {renderDownloadDataLink(region)}
          {renderDataReadmeLink()}
        </div>
      </div>
    )
  }

  const renderMaskLayerCard = (layer) => (
    <LayerCard
      key={layer.id}
      variant='toggle'
      layer={layer}
      secondaryAction={
        <Switch
          onChange={() => onToggleLayer({ layer })}
          checked={activeLayers.includes(layer)}
          onColor={colors.positive}
          offColor={colors.links.default}
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
    >
      {selectedRegion && <WidgetContainer layer={layer} region={selectedRegion} />}
    </LayerCard>
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
      <button
        className={classes.addLayerButton}
        onClick={() => history.push('/map/datasets/water')}
        style={additionalBtnStyle}
      >
      <i className={`icon__plus-circle ${classes.addLayerButtonIcon}`} />
        Add datasets
      </button>
    )
  }

  const renderDownloadDataLink = (region) => {
    return (
      <a
        href={`/api/v1/widget_datapoints/${region.gid_2}/all/csv`}
        className={classes.downloadLink}
      >
        <i className={`icon__download ${classes.downloadIcon}`} />
        <span>Download all data for this region</span>
      </a>
    )
  }

  const renderDataReadmeLink = () => {
    return (
      <a
        href={`/info/data-readme`}
        target='_blank'
        rel='noopener noreferrer'
        className={classes.downloadLink}
      >
        <i className={`icon__info ${classes.downloadIcon}`} />
        <span>Read me</span>
      </a>
    )
  }

  return (
    <div id='sideBar' className={classes.sideBar}>
      <header className={classes.header}>
        <h1 className={classes.headerTitle}>Investigation</h1>
        {renderAddLayerButton()}
      </header>

      {renderRegionInfo(selectedRegion)}

      <div id='sideBarContent' className={classes.sideBarContent}>
        {maskLayers && maskLayers.map(renderMaskLayerCard)}
        {activeLayers.filter(layer => !layer.mask).map(renderLayerCard)}
        {renderAddLayerButton(true)}
      </div>
      <a href='//resourcewatch.org/'
         className='map-credit'
         target='_blank'
         rel='noopener noreferrer'>
        <img src={resourceWatchLogo} />
      </a>
    </div>
  )
}

import PropTypes from 'prop-types'
MapSideBar.propTypes = {
  history: PropTypes.object.isRequired,
  onRemoveLayer: PropTypes.func.isRequired,
  onToggleLayer: PropTypes.func.isRequired,
  maskLayers: PropTypes.array,
  activeLayers: PropTypes.array.isRequired,
  selectedRegion: PropTypes.object,
  classes: PropTypes.object,
}

export default withRouter(injectSheet(styles)(MapSideBar))
