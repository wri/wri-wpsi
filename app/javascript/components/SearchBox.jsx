import React, { useState } from 'react'
import Select from 'react-select'

const SearchBox = (props) => {
  const { options, onSelection, name } = props

  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (selectedOpt) => {
    setSelectedOption(selectedOpt)
    onSelection(selectedOpt ? selectedOpt.value : null)
  }

  return <div style={{width: 500}}>
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isSearchable={true}
      isClearable={true}
      placeholder={`Search ${name}`}
    />
  </div>
}

import PropTypes from 'prop-types'
SearchBox.propTypes = {
  options: PropTypes.array.isRequired,
  onSelection: PropTypes.func.isRequired,
  name: PropTypes.string,
}

export default SearchBox
