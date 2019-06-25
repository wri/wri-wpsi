import React from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import Legend from 'components/Legend'
import SearchBox from 'components/SearchBox'
import RegionInfoBox from 'components/RegionInfoBox'
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
    }).sort((a, b) => (a.label > b.label) ? 1 : -1)
  }

  getSelectedRegion() {
    const features = this.state.data && this.state.data.features || []
    let selectedRegion = null

    features.forEach((feature) => {
      if (feature.properties.gid_2 === this.state.selectedRegionGid2) {
        selectedRegion = feature
      }
    })

    return selectedRegion
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

  render() {
    const position = [this.state.lat, this.state.lng]
    const features = this.state.data && this.state.data.features || []
    const selectedRegion = this.getSelectedRegion()

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
          getRiskColor={this.getRiskColor}
        />

        <Legend getColor={this.getRiskColor} />
      </Map>

      <SearchBox
        name='countries'
        options={this.optionsForCountrySearch()}
        onSelection={this.handleCountrySelection.bind(this)}
      />

      <SearchBox
        name='regions'
        options={this.optionsForRegionSearch()}
        onSelection={this.handleRegionSelection.bind(this)}
      />

      {selectedRegion && <RegionInfoBox region={selectedRegion} />}
    </React.Fragment>
  }
}

export default MainMap
