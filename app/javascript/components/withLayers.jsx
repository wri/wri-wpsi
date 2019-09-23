import React from 'react'

const MASK_LAYER = {
  id: 'c7e76588-6da5-4645-8842-2d2ac0001110',
  name: 'Highlight areas of water stress',
  maskLayer: true,
}

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
          this.setState({layers: [...layers, MASK_LAYER]})
        })
    }

    render() {
      return <WrappedComponent layers={this.state.layers} {...this.props} />
    }
  }
}

export default withLayers