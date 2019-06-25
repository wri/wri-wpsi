import React from 'react'
import { Map, TileLayer, Popup, ZoomControl } from 'react-leaflet'
import Legend from 'components/Legend'
import SearchBox from 'components/SearchBox'
import ConflictRiskLayer from 'components/ConflictRiskLayer'

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

  optionsForCountrySearch() {
    return this.optionsForSearch('gid_0', 'name_0')
  }

  optionsForRegionSearch() {
    return this.optionsForSearch('gid_2', 'name_2')
  }

  optionsForSearch(valueField, labelField) {
    const features = this.state.data && this.state.data.features || []

    let dictionary = {}

    features.forEach((feature) => (
      dictionary[feature.properties[valueField]] = feature.properties[labelField]
    ))

    return Object.keys(dictionary).map((value) => {
      return {
        value: value,
        label: dictionary[value],
      }
    })
  }

  countries() {
    return [
      'ETH',
      'SOM',
      'KEN',
    ]
  }

  fetchMapData() {
    const tableName = `"wri-rw".wpsi_may2019_geospatial_current_only_rfe_true`
    const whereClause = `WHERE gid_0 IN ('${this.countries().join("', '")}')`
    const query = `SELECT * FROM ${tableName} ${whereClause}`

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

  handleCountrySelection(selectedRegionGid0) {
    this.setState({
      selectedRegionGid0: selectedRegionGid0,
    })
  }

  handleRegionSelection(selectedRegionGid2) {
    this.setState({
      selectedRegionGid2: selectedRegionGid2,
    })
  }

  handleLayerSelection(selectedLayer) {
    selectedLayer.bringToFront()

    console.log("Selected layer: ", selectedLayer)

    this.setState({
      selectedLayer: selectedLayer,
    })
  }

  clickToFeature(e) {
    const layer = e.target

    // console.log(e.target.getBounds())
    this.handleLayerSelection(layer)
    this.handleRegionSelection(layer.feature.properties.gid_2)
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

    return <React.Fragment>
      <Map
        center={position}
        zoomControl={false}
        zoom={this.state.zoom}
        style={{height: 800}}
      >
        <ZoomControl position='topright' />

        <TileLayer
          url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          subdomains='abcd'
          maxZoom={19}
        />

        <ConflictRiskLayer
          features={features}
          selectedRegionGid0={this.state.selectedRegionGid0}
          selectedRegionGid2={this.state.selectedRegionGid2}
          onEachFeature={this.onEachFeature.bind(this)}
          renderPopup={this.renderPopup.bind(this)}
          getRiskColor={this.getRiskColor}
        />

        <Legend getColor={this.getRiskColor} />
      </Map>

      <p>Country search:</p>
      <SearchBox
        name='countries'
        options={this.optionsForCountrySearch()}
        onSelection={this.handleCountrySelection.bind(this)}
      />

      <p>Region search:</p>
      <SearchBox
        name='regions'
        options={this.optionsForRegionSearch()}
        onSelection={this.handleRegionSelection.bind(this)}
      />
    </React.Fragment>
  }
}

export default MainMap
