import React from 'react'
import { LAYERS } from 'components/datasets'
import { Icon } from 'vizzuality-components'
import LayerCard from 'components/LayerCard'

const DatasetsModal = ({ open, onClose, isActive, onToggleLayerClick }) => {
  const [selectedTab, setSelectedTab] = React.useState('Conflict')

  if (open) {
    const modalBackgroundStyle = {
      position: 'fixed',
      zIndex: '10001',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',
    }
    const modalStyle = {
      backgroundColor: '#fefefe',
      margin: '15% auto',
      padding: '20px',
      border: '1px solid #888',
      width: '80%',
    }
    const modalHeaderStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    }
    const spaceBetweenColumns = 4
    const layerListStyle = {
      flex: `${50 - (spaceBetweenColumns / 2)}%`,
    }
    const tabsListStyle = {
      marginTop: '18px',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
    }
    const tabStyle = {
      padding: '6px 18px',
      paddingLeft: 0,
      border: '0',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      outline: 'none',
      fontSize: '16px',
      color: '#244F5E',
    }
    const selectedTabStyle = {
      ...tabStyle,
      boxShadow: 'inset 0 -2px 0 0 #526173',
    }
    const tabDescriptionStyle = {
      padding: '',
      marginRight: '300px',
      marginBottom: '36px',
    }
    const moreLinkStyle = {
      paddingLeft: '5px',
      textDecoration: 'none',
      textTransform: 'uppercase',
      fontSize: 'smaller',
      float: 'right',
    }
    const closeButtonStyle = {
      padding: '0',
      border: '0',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      outline: 'none',
    }
    const addButtonStyle = {
      height: '36px',
      width: '69px',
      border: '1px solid #285969',
      borderRadius: '3px',
      textTransform: 'uppercase',
    }

    const renderTab = (tabName) => (
      <button
        key={tabName}
        style={tabName === selectedTab ? selectedTabStyle : tabStyle}
        id={`${tabName}-tab`}
        onClick={() => setSelectedTab(tabName)}
      >
        {tabName}
      </button>
    )

    const renderAddButton = (layer) => (
      <button
        style={addButtonStyle}
        id={`layer-${layer.id}`}
        onClick={onToggleLayerClick}
      >
        {isActive(layer) ? 'Remove' : 'Add'}
      </button>
    )

    const filteredLayers = selectedTab === 'More >' ?
      LAYERS :
      LAYERS.filter((layer) => layer.category === selectedTab)
    const firstColLength = Math.ceil(filteredLayers.length / 2)

    const categories = [...new Set(LAYERS.map((layer) => layer.category))].sort()

    return (
      <div style={modalBackgroundStyle} id='modal-background'>
        <div style={modalStyle} id='modal'>
          <div style={modalHeaderStyle}>
            <h1>Add Datasets to Investigation</h1>

              <button style={closeButtonStyle} onClick={onClose} aria-label="Close">
                <Icon name="icon-cross" className="-small" />
              </button>
          </div>

          <div style={tabsListStyle}>
            {categories.map((category) => renderTab(category))}
            {renderTab('More >')}
          </div>

          <div style={tabDescriptionStyle}>
            {selectedTab} is one of the categories of datasets we are showing.
            This is where we will eventually put a description of the {selectedTab} category.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere enim mi, vitae fringilla dui ullamcorper et. Proin egestas metus metus, vel congue enim eleifend sed.
            <a href="#" style={moreLinkStyle}>Learn more &gt;</a>
          </div>

          <div style={{display: 'flex'}}>
            <div style={layerListStyle}>
              {filteredLayers.slice(0, firstColLength).map((layer) => {
                return <LayerCard
                  key={layer.id}
                  layer={layer}
                  variant='white'
                  secondaryAction={renderAddButton(layer)}
                />
              })}
            </div>
            <div style={{flex: `${spaceBetweenColumns}%`}} />
            <div style={layerListStyle}>
              {filteredLayers.slice(firstColLength, filteredLayers.length).map((layer) => {
                return <LayerCard
                  key={layer.id}
                  layer={layer}
                  variant='white'
                  secondaryAction={renderAddButton(layer)}
                />
              })}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

import PropTypes from 'prop-types'
DatasetsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired,
  onToggleLayerClick: PropTypes.func.isRequired,
}

export default DatasetsModal
