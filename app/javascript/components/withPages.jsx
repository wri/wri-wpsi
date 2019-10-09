import React from 'react'

const withPages = (WrappedComponent) => {
  return class WithPages extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        pages: []
      }
    }

    componentDidMount() {
      fetch('/api/v1/pages.json')
        .then(response => response.json())
        .then((data) => {
          this.setState(data)
        })
    }

    render() {
      return <WrappedComponent pages={this.state.pages} {...this.props} />
    }
  }
}

export default withPages
