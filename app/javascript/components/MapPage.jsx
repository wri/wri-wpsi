import React from 'react'
import Legend from 'components/Legend'
import { Map, TileLayer, ZoomControl, LayersControl } from 'react-leaflet'
import SearchBox from 'components/SearchBox'
import RegionInfoBox from 'components/RegionInfoBox'
import ConflictRiskLayer from 'components/ConflictRiskLayer'
import WriLayer from 'components/WriLayer'

class MapPage extends React.Component {
  constructor(props) {
    super(props)

    const datasetId = '0c3dfe3b-2cd5-4125-ac84-9ce0a73f34b3'
    this.outputLayerId = '107b72a6-6a52-4c8e-a261-d01706627322'
    this.outputLayerURL = `https://api.resourcewatch.org/v1/dataset/${datasetId}/layer/${this.outputLayerId}`
    this.mapHeight = 800

    this.layers = []

    this.state = {
      initialPosition: [
        0, // Latitude
        40, // Longitude
      ],
      intitialZoom: 4,
      data: null,
      layerConfig: null,
      legendConfig: null,
      loading: true,
    }
  }

  componentDidMount() {
    const layers = [
      {
        url: this.outputLayerURL,
        scope: `WHERE gid_0 IN ('${this.countries().join("', '")}')`,
      },
      {
        url: 'https://api.resourcewatch.org/v1/dataset/a86d906d-9862-4783-9e30-cdb68cd808b8/layer/2a694289-fec9-4bfe-a6d2-56c3864ec349',
        scope: `WHERE country IN ('${this.countries().join("', '")}')`,
      },
    ]

    layers.forEach((layer) => {
      this.fetchLayer(layer.url, layer.scope)
    })
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
      // 'IND',
    ]
  }

  fetchLayer(url, scope) {
    this.setState({loading: true})

    fetch(url)
      .then(response => response.json())
      .then(response => {
        const layer = response.data
        if (layer.id == this.outputLayerId) {
          this.setState(layer.attributes)
        }
        this.fetchLayerData(layer, scope)
      })
  }

  fetchLayerData(layer, scope) {
    const sql = layer.attributes.layerConfig.body.layers[0].options.sql
    const isMainLayer = layer.id == this.outputLayerId

    fetch(`https://wri-rw.carto.com:443/api/v2/sql?format=geojson&q=${sql} ${scope}`)
      .then(response => response.json())
      .then(data => {
        layer.data = data
        this.layers.push(layer)
        if (isMainLayer) {
          this.setState({ data, loading: false })
        }
      })
  }

  handleCountrySelection(selectedRegionGid0) {
    this.setState({selectedRegionGid0: selectedRegionGid0})
  }

  handleRegionSelection(selectedRegionGid2) {
    this.setState({selectedRegionGid2: selectedRegionGid2})
  }

  handleLayerSelection(selectedLayer) {
    selectedLayer.bringToFront()
    this.zoomToLayer(selectedLayer)
    this.setState({selectedLayer: selectedLayer})
  }

  zoomToLayer(layer) {
    this.setState({mapBounds: layer.getBounds()})
  }

  clickToFeature(e) {
    const layer = e.target
    this.handleLayerSelection(layer)
    this.handleRegionSelection(layer.feature.properties.gid_2)
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.clickToFeature.bind(this),
    })
  }

  renderBasemaps() {
    const maxZoom = 19
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
    const basemaps = [
      {name: 'Positron',                         url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'             },
      {name: 'Dark Matter',                      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'              },
      {name: 'Positron (No Labels)',             url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'        },
      {name: 'Dark Matter (No Labels)',          url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'         },
      {name: 'CartoDB World Antique',            url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png' },
      {name: 'CartoDB World Eco',                url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png'     },
      {name: 'CartoDB World Flat Blue',          url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-flatblue/{z}/{x}/{y}.png'},
      {name: 'CartoDB World Midnight Commander', url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png'},
    ]
    const initialBasemap = 'Positron'

    return basemaps.map((basemap) => (
      <LayersControl.BaseLayer
        key={basemap.name}
        name={basemap.name}
        checked={basemap.name === initialBasemap}
      >
        <TileLayer
          url={basemap.url}
          attribution={attribution}
          maxZoom={maxZoom}
        />
      </LayersControl.BaseLayer>
    ))
  }

  renderLayers() {
    return this.layers.map((layer) => {
      const isMainLayer = layer.id == this.outputLayerId
      const Layer = isMainLayer ? ConflictRiskLayer : WriLayer

      return <LayersControl.Overlay key={layer.id} name={layer.attributes.name} checked={isMainLayer}>
        <Layer
          name={layer.attributes.name}
          features={layer.data && layer.data.features || []}
          selectedRegionGid0={this.state.selectedRegionGid0}
          selectedRegionGid2={this.state.selectedRegionGid2}
          onEachFeature={isMainLayer ? this.onEachFeature.bind(this) : () => null}
        />
      </LayersControl.Overlay>
    })
  }

  render() {
    const selectedRegion = this.getSelectedRegion()

    return <React.Fragment>
      {this.state.loading ?
        <div style={{height: this.mapHeight, backgroundColor: '#EEE'}}>
          <div style={{maxWidth: '200px', margin: 'auto', paddingTop: this.mapHeight / 2}}>
            Loading...
          </div>
        </div>
        :
        <Map
          center={this.state.initialPosition}
          bounds={this.state.mapBounds}
          zoomControl={false}
          zoom={this.state.intitialZoom}
          minZoom={this.state.layerConfig.body.minzoom}
          maxZoom={this.state.layerConfig.body.maxzoom}
          style={{height: this.mapHeight}}
        >
          <ZoomControl position='topright' />
          <LayersControl position='topright'>
            {this.renderBasemaps()}
            {this.renderLayers()}
          </LayersControl>

          <Legend title={this.state.name} legendConfig={this.state.legendConfig} />
        </Map>
      }

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

export default MapPage
