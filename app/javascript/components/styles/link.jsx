import styleVariables from './variables'

const linkStyle = (type='text') => {
  const { colors } = styleVariables()

  return {
    color: colors.links.default,
    '&:hover': {
      color: colors.links.hover,
      backgroundColor: type === 'tab' ? colors.gray1 : 'none'
    }
  }
}

export default linkStyle
