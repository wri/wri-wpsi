import React from 'react'
import L from 'leaflet'

class LayerMap extends React.Component {
  state = {}
  featureLimit = 500

  addDataToMap(data) {
    const { features } = data
    features.forEach((feature) => L.geoJSON(feature).addTo(this.map))
  }

  componentDidMount() {
    this.map = new L.map('map').setView([20, 40], 3);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibGJyYXVuLWdyIiwiYSI6ImNqeThvbTFvNTAxcG0zY3IxbzN4ZTVzcHoifQ.28KO3JiOr7491pBkBJHVbA'
    }).addTo(this.map);

    const layerId = this.props.match.params.layerId
    const layerUrl = `https://api.resourcewatch.org/v1/layer/${layerId}`

    fetch(layerUrl)
      .then(response => response.json())
      .then(response => {
        const layer = response.data
        this.setState(layer.attributes)

        const account = this.state.layerConfig.account
        const url = `https://${account}.carto.com/api/v1/map`
        const data = this.state.layerConfig.body
        const payload = {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(data),
        }

        fetch(url, payload)
          .then(response => response.json())
          .then(response => {
            console.log(response)
            this.setState({cdn_url: `${response.cdn_url.templates.https.url}/${account}/api/v1/map/${response.layergroupid}/{z}/{x}/{y}.png`})

            L.tileLayer(this.state.cdn_url).addTo(this.map)
          })

        layer.attributes.layerConfig.type == 'gee' && alert(`GEE layers not supported`)

        const layers = layer.attributes.layerConfig.body.layers
        if (layers) {
          const sql = layers[0].options.sql
          const account = layer.attributes.layerConfig.account
          const scope = `LIMIT ${this.featureLimit}`
          const dataUrl = `https://${account}.carto.com:443/api/v2/sql?format=geojson&q=${sql} ${scope}`

          fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
              data.error && alert(`Error in API request:\n${data.error.join(', ')}\n\nRequest:\n${dataUrl}`)
              this.addDataToMap(data)
            })
        } else {
          // console.log("Not a normal layer: ")
          // console.info(layer)
        }
      })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const infoStyle = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: 19,
    }

    const mapStyle = {
      position: 'absolute',
      top: 85,
      bottom: 200,
      width: '100%',
    }

    return <React.Fragment>
      <div style={infoStyle}>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        <i>Note: all layers are limited to {this.featureLimit} GeoJSON features.</i>
      </div>
      <div style={mapStyle} id='map' />
    </React.Fragment>
  }
}

import PropTypes from 'prop-types'
LayerMap.propTypes = {
  match: PropTypes.object.isRequired,
}

export default LayerMap
