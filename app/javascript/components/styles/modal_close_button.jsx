import styleVariables from 'components/styles/variables'

const modalCloseButtonStyles = () => {
  const { colors } = styleVariables()

  return {
    padding: '0',
    border: '0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    marginLeft: '20px',
    '&:hover': {
      transform: 'scale(1.3)',
      transformOrigin: 'center center',
    },
    '&:hover svg': {
      fill: colors.links.default
    }
  }
}

export default modalCloseButtonStyles
