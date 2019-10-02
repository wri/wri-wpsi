import React from 'react'

const withLayers = (WrappedComponent) => {
  return class WithLayers extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        layers: []
      }
    }

    componentDidMount() {
      fetch('/api/v1/layers.json')
        .then(response => response.json())
        .then(({ layers }) => {
          this.setState({layers: [...layers]})
        })
    }

    render() {
      return <WrappedComponent layers={this.state.layers} {...this.props} />
    }
  }
}

export default withLayers
