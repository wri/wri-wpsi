import React from 'react'
import { withRouter } from 'react-router-dom'
import { Icon } from 'vizzuality-components'
import Modal from 'components/Modal'
import LayerCard from 'components/LayerCard'
import styleVariables from 'components/styles/variables'
import injectSheet, { jss } from 'react-jss'

const LAYERS = window.layers
const CATEGORIES = window.categories

const styleVars = styleVariables()
const { colors } = styleVars
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

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -20px -20px',
    background: '#F5F5F5',
    padding: 10,
    maxHeight: '40vh',
    overflow: 'auto',
    borderTop: `2px solid ${colors.gray1}`,
  },
  tabList: {
    marginTop: '15px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tab: tabStyle,
  selectedTab: {
    ...tabStyle,
    boxShadow: 'inset 0 -2px 0 0 #526173',
  },
  tabDescription: {
    padding: '20px',
    margin: '0 -20px',
    background: colors.gray1
  },
  moreLink: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: 'smaller',
    float: 'right',
    whiteSpace: 'nowrap',
  },
  closeButton: {
    padding: '0',
    border: '0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
  },
  addButton: {
    height: '36px',
    width: '69px',
    border: '1px solid #285969',
    borderRadius: '3px',
    textTransform: 'uppercase',
  },
}

const DatasetsModal = ({ open, onClose, isActive, onToggleLayerClick, tab, history, classes }) => {
  const allDatasetsCategory = {slug: 'all', title: 'All Data >'}
  const selectedCategory = CATEGORIES.find(c => c.slug === tab) || allDatasetsCategory
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
      const shortenedTextClasses = 'clamp-after-two-lines fade-after-two-lines'

      return (
        <div className={classes.tabDescription}>
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
        className={classes.moreLink}
        onClick={() => setDescriptionExpanded(!descriptionExpanded)}
      >
        {descriptionExpanded ? 'Show less ^' : 'Show more >'}
      </a>
    )

    const renderAddButton = (layer) => (
      <button
        className={classes.addButton}
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
      <Modal>
        <div className={classes.header}>
          <h1>Add Datasets to Investigation</h1>

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
}

export default withRouter(injectSheet(styles)(DatasetsModal))
