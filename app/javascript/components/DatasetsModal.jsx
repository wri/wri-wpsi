import React from 'react'
import { withRouter } from 'react-router-dom'
import { LAYERS } from 'components/datasets'
import { Icon } from 'vizzuality-components'
import LayerCard from 'components/LayerCard'

const CATEGORIES = window.categories

const DatasetsModal = ({ open, onClose, isActive, onToggleLayerClick, tab, history }) => {
  const allDatasetsCategory = {slug: 'all', title: 'All Data >'}
  const selectedCategory = CATEGORIES.find(c => c.slug === tab) || allDatasetsCategory
  const [descriptionExpanded, setDescriptionExpanded] = React.useState(false)

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
    const layerListStyle = {
      display: 'flex',
      flexWrap: 'wrap',
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
      textDecoration: 'none',
      textTransform: 'uppercase',
      fontSize: 'smaller',
      float: 'right',
      whiteSpace: 'nowrap',
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

    const renderTab = (category) => (
      <button
        key={category.slug}
        style={category.slug === selectedCategory.slug ? selectedTabStyle : tabStyle}
        id={`${category.slug}-tab`}
        onClick={
          () => {
            history.push(`/map/datasets/${category.slug}`)
            setDescriptionExpanded(false)
          }
        }
      >
        {category.title}
      </button>
    )

    const renderDescription = (category) => {
      const cutoff = 300
      const long = category.description.length > cutoff
      const shortenedTextClasses = 'clamp-after-two-lines fade-after-two-lines'

      return (
        <div style={tabDescriptionStyle}>
          <div className={descriptionExpanded ? null : shortenedTextClasses}>
            {descriptionExpanded ? category.description : category.description.substring(0, cutoff)}
          </div>
          <div>
            {long && renderDescriptionExpansionLink()}
          </div>
        </div>
      )
    }

    const renderDescriptionExpansionLink = () => (
      <a
        href="#"
        style={moreLinkStyle}
        onClick={() => setDescriptionExpanded(!descriptionExpanded)}
      >
        {descriptionExpanded ? 'Show less ^' : 'Show more >'}
      </a>
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

    const filteredLayers = selectedCategory.slug === 'all' ?
      LAYERS :
      LAYERS.filter((layer) => layer.category_slugs.includes(selectedCategory.slug))

    const categories = CATEGORIES.sort(category => category.title)

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
            {renderTab(allDatasetsCategory)}
          </div>

          {selectedCategory.slug !== 'all' && renderDescription(selectedCategory)}

          <div style={layerListStyle}>
            {filteredLayers.map((layer) => (
              <div key={layer.id} style={{width: '48%', padding: '0 1%'}}>
                <LayerCard
                  layer={layer}
                  variant='white'
                  excludedTag={selectedCategory.slug}
                  secondaryAction={renderAddButton(layer)}
                />
              </div>
            ))}
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
  tab: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(DatasetsModal)
