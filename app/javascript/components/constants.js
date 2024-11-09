const BASEMAPS = {
  dark: {
    id: 'dark',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqgjq1908ar2smep2wd7wf7/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdTh5N2swMm9sMndwYzZuNnFtY3NkIn0.26SGTMZGMtgNJaonQfiKjQ',
    label: 'Dark',
    options: {
      zoomOffset: -1, tileSize: 512,
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  },
  light: {
    id: 'light',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqgk77j0r7h2sqw220p7imy/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdTh5N2swMm9sMndwYzZuNnFtY3NkIn0.26SGTMZGMtgNJaonQfiKjQ',
    label: 'Light',
    options: {
      zoomOffset: -1, tileSize: 512,
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  },
  satellite: {
    id: 'satellite',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqiecof53wv2rl9gw4cehmy/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdTh5N2swMm9sMndwYzZuNnFtY3NkIn0.26SGTMZGMtgNJaonQfiKjQ',
    label: 'Satellite',
    options: {
      zoomOffset: -1, tileSize: 512,
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  },
  terrain: {
    id: 'terrain',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqi456h02pg2rp6w2mwp61c/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdTh5N2swMm9sMndwYzZuNnFtY3NkIn0.26SGTMZGMtgNJaonQfiKjQ',
    label: 'Terrain',
    options: {
      zoomOffset: -1, tileSize: 512,
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  }
};

const LABELS = {
  none: {
    id: 'none',
    label: 'No labels',
    value: 'no_labels'
  },
  light: {
    id: 'light',
    label: 'Labels light',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjgcf9rs05qnu2rrpp4qzucox/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdTh5N2swMm9sMndwYzZuNnFtY3NkIn0.26SGTMZGMtgNJaonQfiKjQ',
    options: {
      zoomOffset: -1, tileSize: 512
    }
  },
  dark: {
    id: 'dark',
    label: 'Labels dark',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjgcf9gqk9tmm2spd9zr0tml3/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdTh5N2swMm9sMndwYzZuNnFtY3NkIn0.26SGTMZGMtgNJaonQfiKjQ',
    options: {
      zoomOffset: -1, tileSize: 512
    }
  }
};

const BOUNDARIES = {
  dark: {
    id: 'dark',
    label: 'Boundaries',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjgcf8qdaai1x2rn6w3j4q805/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdTh5N2swMm9sMndwYzZuNnFtY3NkIn0.26SGTMZGMtgNJaonQfiKjQ',
    options: {
      zoomOffset: -1, tileSize: 512
    }
  }
};

export { BASEMAPS, LABELS, BOUNDARIES };
