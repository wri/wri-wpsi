import React, { Component } from 'react'
import injectSheet from 'react-jss'
import styleVariables from 'components/styles/variables'
import PropTypes from 'prop-types'

const { colors } = styleVariables()
const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'none',
    outline: 'none',
    border: 0,
    padding: 0,
    cursor: 'pointer',
    '&:hover span': {
      backgroundColor: colors.links.default,
      color: 'white',
    },
    '&.viewing span': {
      borderColor: colors.positive,
      color: 'black',
    },
    '&.viewing span:last-child': {
      backgroundColor: colors.positive,
      color: 'white',
    },
    '&.viewing:hover span': {
      borderColor: colors.warning,
      backgroundColor: 'white',
    },
    '&.viewing:hover span:last-child': {
      borderColor: 'white',
      backgroundColor: colors.warning
    }
  },
  text: {
    padding: '4px 15px 4px 10px',
    borderRadius: 3,
    zIndex: 0,
    border: `1px solid ${colors.links.default}`,
  },
  iconWrapper: {
    position: 'relative',
    marginLeft: -10,
    height: 30,
    width: 30,
    borderRadius: '50%',
    backgroundColor: 'white',
    border: `1px solid ${colors.links.default}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 15,
  }
}

class LayerToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showText: props.text.current,
      showIcon: props.icon.current,
    }
  }

  static propTypes = {
    text: PropTypes.object,
    state: PropTypes.bool,
    action: PropTypes.func,
    icon: PropTypes.object,
    id: PropTypes.string,
    classes: PropTypes.object,
    classNames: PropTypes.string,
  }

  handleUpdateText(action) {
    const { text, icon } = this.props
    const getText = (obj) => action === 'in' ? obj.action : obj.current
    this.setState({
      showText: getText(text),
      showIcon: getText(icon),
    })
  }

  handleClick(event) {
    this.props.action(event)
    setTimeout(()=> this.handleUpdateText('out'), 100)
  }

  render() {
    const { classes, id, classNames } = this.props
    const { showText, showIcon } = this.state
    const wrapperClassNames = `${classes.wrapper} ${classNames}`
    return (
      <button
        className={wrapperClassNames}
        onClick={this.handleClick.bind(this)}
        onMouseOver={this.handleUpdateText.bind(this, 'in')}
        onMouseOut={this.handleUpdateText.bind(this, 'out')}
        id={id}
        >
        <span className={classes.text}> { showText } </span>
        <span className={classes.iconWrapper}>
          <i className={`icon__${showIcon} ${classes.icon}`} />
        </span>
      </button>
    )
  }
}

export default injectSheet(styles)(LayerToggle)
