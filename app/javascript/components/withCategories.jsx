import React from 'react'

const withCategories = (WrappedComponent) => {
  return class WithCategories extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        categories: []
      }
    }

    componentDidMount() {
      fetch('/api/v1/categories.json')
        .then(response => response.json())
        .then((data) => {
          this.setState(data)
        })
    }

    render() {
      return <WrappedComponent categories={this.state.categories} {...this.props} />
    }
  }
}

export default withCategories
