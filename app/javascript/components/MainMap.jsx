import React from 'react'
import { Map, TileLayer, GeoJSON, Popup, LayersControl, FeatureGroup } from 'react-leaflet'
import Legend from 'components/Legend'

class MainMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: 0,
      lng: 0,
      zoom: 4,
      data: null,
    }
  }

  componentDidMount() {
    this.fetchMapData()
  }

  fetchMapData() {
    const countries = [
      'ETH',
      'SOM',
      'KEN',
    ]
    const query = `SELECT * FROM "wri-rw".wpsi_may2019_geospatial_current_only_rfe_true WHERE gid_0 IN ('${countries.join("', '")}')`

    fetch(`https://wri-rw.carto.com:443/api/v2/sql?format=geojson&q=${query}`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  getRiskColor(risk) {
      return risk >= 1 ?   '#800026' :
             risk >= 0.9 ? '#BD0026' :
             risk >= 0.8 ? '#E31A1C' :
             risk >= 0.7 ? '#FC4E2A' :
             risk >= 0.6 ? '#FD8D3C' :
             risk >= 0.5 ? '#FEB24C' :
             risk >= 0.4 ? '#FED976' :
                           '#FFEDA0';
  }

  clickToFeature(e) {
    const layer = e.target
    // console.log(e.target.getBounds())
    this.setState({
      selectedRegion: layer.feature.properties,
    })
  }

  onEachFeature(feature, layer) {
    layer.on({
      // mouseover: this.highlightFeature.bind(this),
      // mouseout: this.resetHighlight.bind(this),
      click: this.clickToFeature.bind(this),
    })
  }

  renderPopup(region) {
    const attributes = [
      // 'cartodb_id',
      // 'cc_1',
      // 'cc_2',
      // 'engtype_1',
      // 'engtype_2',
      // 'fid_1',
      // 'gid_0',
      // 'gid_01',
      // 'gid_1',
      // 'gid_2',
      // 'gid_23',
      // 'gid_23_24',
      // 'hasc_1',
      // 'hasc_2',
      // 'name_0',
      // 'name_1',
      // 'name_2',
      // 'nl_name_1', // Empty
      // 'nl_name_2', // Empty
      // 'type_1',
      // 'type_2',
      // 'varname_1',
      // 'varname_2',
      // 'aug2018',
      // 'dec2018',
      // 'july2018',
      // 'june2018',
      // 'nov2018',
      // 'oct2018',
      // 'sept2018',
    ]
    return <Popup>
      <h3>{region.name_2}</h3>
      <div><b>State:</b> {region.name_1}</div>
      <div><b>Country:</b> {region.name_0}</div>
      {attributes.map((attribute) => {
          return (
            <div key={attribute}><b>{attribute}:</b> {region[attribute]}</div>
          )
        })
      }
      <h1>Risk of conflict: {Math.round(region.dec2018 * 100)}%</h1>
      <div>(December 2018)</div>
    </Popup>
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const features = this.state.data && this.state.data.features || []

    const regions = features.map((feature) => {
      return <GeoJSON
        data={feature}
        key={feature.properties.cartodb_id}
        onEachFeature={this.onEachFeature.bind(this)}
        style={() => {
          return {
            'color': 'white',
            'fillColor': this.getRiskColor(feature.properties.dec2018),
            'weight': 1,
            'opacity': 1,
            'fillOpacity': 1,
          }
        }}
      >
        {this.renderPopup(feature.properties)}
      </GeoJSON>
    })

    return (
      <Map center={position} zoom={this.state.zoom} style={{height: 1000}}>
        <LayersControl position='topright'>
          <LayersControl.BaseLayer name='cartodb.light_nolabels' checked={true}>
            <TileLayer
              url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
              subdomains='abcd'
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='cartodb.dark_nolabels'>
            <TileLayer
              url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
              subdomains='abcd'
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name='Conflict risk model output' checked={true}>
            <FeatureGroup>
              {regions}
              <Legend getColor={this.getRiskColor} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    )
  }
}

export default MainMap
