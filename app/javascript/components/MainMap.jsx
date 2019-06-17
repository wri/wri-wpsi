import React from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'

class MainMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: 0,
      lng: 0,
      zoom: 2,
      data: null,
    }
  }

  componentDidMount() {
    fetch('https://wri-rw.carto.com:443/api/v2/sql?q=select * from "wri-rw".powerwatch_data_20180102 limit 100')
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }


  render() {
    const position = [this.state.lat, this.state.lng]
    const rows = this.state.data && this.state.data.rows || []

    const markers = rows.map((row) => {
      return <Marker key={row.cartodb_id} position={[row.latitude, row.longitude]}>
        <Popup>
          <h2>{row.name}</h2>
          <p>Primary fuel: {row.primary_fuel}</p>
          <p>
            <a href={row.url} target="blank">More info</a>
          </p>
        </Popup>
      </Marker>
    })

    return (
      <Map center={position} zoom={this.state.zoom} style={{height: 500}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          subdomains='abcd'
          maxZoom={19}
        />
        <GeoJSON data={this.state.data} />
        {markers}
      </Map>
    )
  }
}

export default MainMap
