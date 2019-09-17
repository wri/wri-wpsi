import styleVariables from 'components/styles/variables'

const scrollBarStyle = () => {
  const { colors } = styleVariables()

  return {
    '&::-webkit-scrollbar': {
      width: 12,
    },
    '&::-webkit-scrollbar-track': {
      background: colors.gray3
    },
    '&::-webkit-scrollbar-thumb': {
      background: colors.primary,
      cursor: 'pointer',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: colors.primary,
    },
  }
}

export default scrollBarStyle
