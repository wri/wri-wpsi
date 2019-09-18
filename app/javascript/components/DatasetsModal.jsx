import React from 'react'
import { withRouter } from 'react-router-dom'
import { Icon } from 'vizzuality-components'
import Modal from 'components/Modal'
import LayerCard from 'components/LayerCard'
import injectSheet from 'react-jss'
import LayerToggle from 'components/LayerToggle'
import styleVariables from 'components/styles/variables'
import linkStyle from './styles/link'
import scrollBarStyles from './styles/scrollbar'
import modalCloseButtonStyle from './styles/modal_close_button'

const styleVars = styleVariables()
const { colors } = styleVars
const tabStyle = {
  padding: '5px 15px',
  border: '0',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  outline: 'none',
  fontSize: '16px',
  color: '#244F5E',
  fontFamily: 'PT Sans, Helvetica, Arial, sans-serif',
  borderRadius: '15px',
  ...linkStyle('tab')
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: 15,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -20px -20px',
    background: '#F5F5F5',
    padding: 10,
    maxHeight: '50vh',
    overflow: 'auto',
    borderTop: `2px solid ${colors.gray1}`,
    ...scrollBarStyles()
  },
  tabList: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: -15,
    display: 'flex',
    justifyContent: 'space-between',
  },
  tab: tabStyle,
  selectedTab: {
    ...tabStyle,
    backgroundColor: colors.links.default,
    color: 'white',
    fontWeight: '600',
    '&:hover': {
      pointerEvents: 'none',
    }
  },
  tabDescription: {
    padding: '20px',
    margin: '0 -20px',
    background: colors.gray1,
    borderBottom: `1px solid ${colors.gray2}`,
  },
  moreLink: {
    textDecoration: 'none',
    fontSize: 'smaller',
    whiteSpace: 'nowrap',
    marginLeft: 'auto',
    marginBottom: 10,
  },
  closeButton: {
    ...modalCloseButtonStyle()
  },
  addButton: {
    height: '36px',
    width: '69px',
    border: '1px solid #285969',
    borderRadius: '3px',
  },
}

const DatasetsModal = ({ open, onClose, isActive, onToggleLayerClick, tab, history, classes, layers, categories }) => {
  if (categories.length == 0) { return null }

  const allDatasetsCategory = {slug: 'all', title: 'All Data >'}
  const selectedCategory = categories.find(c => c.slug === tab) || allDatasetsCategory
  const [descriptionExpanded, setDescriptionExpanded] = React.useState(false)

  if (open) {
    const renderTab = (category) => (
      <button
        key={category.slug}
        className={category.slug === selectedCategory.slug ? classes.selectedTab : classes.tab}
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
      let shortenedTextClasses = ''

      if (long) shortenedTextClasses = 'clamp-after-two-lines fade-after-two-lines'
      if (descriptionExpanded) shortenedTextClasses = ''
      return (
        <div className={classes.tabDescription}>
          <div className={shortenedTextClasses}>
            {descriptionExpanded ? category.description : category.description.substring(0, cutoff)}
          </div>
          <div style={{display: 'flex'}}>
            {long && renderDescriptionExpansionLink()}
          </div>
        </div>
      )
    }

    const renderDescriptionExpansionLink = () => (
      <a
        href="#"
        className={classes.moreLink}
        onClick={() => setDescriptionExpanded(!descriptionExpanded)}
      >
        {descriptionExpanded ? 'Show less ^' : 'Show more >'}
      </a>
    )

    const renderAddButton = (layer) => (
      <LayerToggle
        text={{
          current: isActive(layer) ? 'Viewing' : 'Add',
          action: isActive(layer) ? 'Remove' : 'Add'
        }}
        icon={{
          current: isActive(layer) ? 'eye' : 'plus-circle',
          action: isActive(layer) ? 'times-solid' : 'plus-circle'
        }}
        classNames={isActive(layer) ? 'viewing' : 'add'}
        action={onToggleLayerClick}
        id={`layer-${layer.id}`}
      />
    )

    const filteredLayers = selectedCategory.slug === 'all' ?
      layers :
      layers.filter(layer => layer.category_slugs.includes(selectedCategory.slug))

    return (
      <Modal>
        <div className={classes.header}>
          <h1 className={classes.title}>Add Datasets to Investigation</h1>

            <button className={classes.closeButton} onClick={onClose} aria-label="Close">
              <Icon name="icon-cross" className="-small" />
            </button>
        </div>

        <div className={classes.tabList}>
          {categories.map((category) => renderTab(category))}
          {renderTab(allDatasetsCategory)}
        </div>

        {selectedCategory.slug !== 'all' && renderDescription(selectedCategory)}

        <div className={classes.list}>
          {filteredLayers.map((layer) => (
            <div key={layer.id} style={{width: '48%', padding: '10px', display: 'flex'}}>
              <LayerCard
                layer={layer}
                variant='white'
                excludedTag={selectedCategory.slug}
                secondaryAction={renderAddButton(layer)}
              />
            </div>
          ))}
        </div>
      </Modal>
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
  layers: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

export default withRouter(injectSheet(styles)(DatasetsModal))
